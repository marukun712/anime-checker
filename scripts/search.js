import { returnCurrentYear, createAnimeInfoCard } from "./utils.js";

const searchParams = new URLSearchParams(window.location.search);

//クエリパラメータからタイトル情報を取得
let str = searchParams.get("title")

async function findAnimesFromAllAnimes(title) {
    //全てのアニメ情報を取得
    let year = returnCurrentYear();

    let startYear = 2014

    let num = year - startYear + 1

    let results = []

    for (let i = 0; i < num; i++) {
        let url = `https://cors-proxy-62vy.onrender.com/https://anime-api.deno.dev/anime/v1/master/${startYear++}/`

        let res = await fetch(url)
        let json = await res.json();

        await json.map((data) => {
            let str = data.title;
            let result = str.indexOf(title)

            if (result !== -1) {
                console.log(str)
                results.push({ id: data.id, title: data.title, year: startYear - 1 })
            }
        })

    }

    return results
}

async function findAnimeInfoFromID(id, year) {
    let result = []

    for (let i = 1; i < 5; i++) {
        let url = `https://cors-proxy-62vy.onrender.com/https://anime-api.deno.dev/anime/v1/master/${year}/${i}`


        let res = await fetch(url)
        let json = await res.json();

        let targetAnimeInfo = await json.find((data) => { return data.id == id })

        if (targetAnimeInfo) {
            result.push(i, targetAnimeInfo)
            return await result
            break;
        }
    }
}

async function main() {
    let animeinfo = await findAnimesFromAllAnimes(str)
    let cardArea = document.getElementById("cardarea");

    if (animeinfo.length == 0) {
        document.getElementById("resultText").innerHTML = "一致する検索結果は見つかりませんでした。"
    } else {
        document.getElementById("resultText").innerHTML = `${animeinfo.length}件のアニメが見つかりました。`

        await animeinfo.map(async (data) => {
            let info = await findAnimeInfoFromID(data.id, data.year)
            createAnimeInfoCard(data.year, info[0], info[1], cardArea)
        })
    }

    await setTimeout(() => {
        document.getElementById("loading").remove();
    }, 2000);

}

main();