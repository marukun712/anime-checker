import { returnCurrentYear, createAnimeInfoCard } from "./utils.js";

const searchParams = new URLSearchParams(window.location.search);

//クエリパラメータからタイトル情報を取得
let str = searchParams.get("title")

//タイトルからアニメidを検索
async function findAnimeIDFromAllAnimes(title) {
    //APIから全てのアニメタイトル情報を取得
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
            //titleと部分一致すると0を返す
            let result = str.indexOf(title)
            console.log(result)

            if (result !== -1) {
                //resultsに一致したアニメのid,title,yearをpushする
                results.push({ id: data.id, title: data.title, year: startYear - 1 })
            }
        })

    }

    return results
}

//idからアニメの詳細情報を取得
async function findAnimeInfoFromID(id, year) {
    let result = []

    for (let i = 1; i < 5; i++) {
        let url = `https://cors-proxy-62vy.onrender.com/https://anime-api.deno.dev/anime/v1/master/${year}/${i}`

        let res = await fetch(url)
        let json = await res.json();

        //idで検索
        let targetAnimeInfo = await json.find((data) => { return data.id == id })

        //マッチしたら終了
        if (targetAnimeInfo) {
            result.push(i, targetAnimeInfo)
            return await result
            break;
        }
    }
}

async function main() {
    let animeinfo = await findAnimeIDFromAllAnimes(str)
    let cardArea = document.getElementById("cardarea");

    if (animeinfo.length == 0) {
        document.getElementById("resultText").innerHTML = "一致する検索結果は見つかりませんでした。"
    } else {
        document.getElementById("resultText").innerHTML = `${animeinfo.length}件のアニメが見つかりました。`

        await animeinfo.map(async (data) => {
            //IDから詳細情報を取得
            let info = await findAnimeInfoFromID(data.id, data.year)
            //カードを作成
            createAnimeInfoCard(data.year, info[0], info[1], cardArea)
        })
    }

    await document.getElementById("loading").remove();
}

main();