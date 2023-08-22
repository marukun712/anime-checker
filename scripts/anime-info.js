import { fetchDOM, createAnimeInfoCard } from './utils.js';

const searchParams = new URLSearchParams(window.location.search);

//クエリパラメータから年、クール、検索対象のアニメIDを取得
let year = searchParams.get("year")
let season = searchParams.get("season")
let id = searchParams.get("id")

async function fetchAnimeinfo(year, season, id) {
    //year,seasonからアニメ一覧を取得
    let url = await `https://anime-api.deno.dev/anime/v1/master/${year}/${season}`;

    let targetSeasonAnimes = await fetch(url);

    let targetSeasonAnimesJson = await targetSeasonAnimes.json()

    //アニメ一覧の中からidにマッチするものを探す
    let targetAnimeInfo = targetSeasonAnimesJson.find((data) => { return data.id == id })

    return await targetAnimeInfo;
}

async function main() {
    let animeInfo = await fetchAnimeinfo(year, season, id);

    //OGP画像を取得する
    let text = await fetchDOM(animeInfo.public_url)

    let imageURL;

    const el = new DOMParser().parseFromString(text, "text/html")
    const headEls = (el.head.children)

    Array.from(headEls).map(v => {
        const prop = v.getAttribute('property')
        if (prop === "og:image") {
            //OGP画像
            imageURL = v.getAttribute("content")
        }
    })

    //アニメ情報を入れる
    document.getElementById('title').innerHTML = animeInfo.title
    document.getElementById('twitter').innerHTML = '@' + animeInfo.twitter_account
    document.getElementById('twitter-tag').innerHTML = 'Twitterタグ: #' + animeInfo.twitter_hash_tag

    if (localStorage.getItem(id)) {
        document.getElementById("likeButton").insertAdjacentHTML("beforeend", `<button class="btn btn-error w-32 h-12" onclick="removeLiked(${id})">お気に入りから削除</button>`)
    }

    if (animeInfo.city_name) {
        document.getElementById('seichi').innerHTML = '聖地:' + animeInfo.city_name
    } else {
        document.getElementById('seichi').innerHTML = '聖地:情報なし'
    }

    document.getElementById('official-site').setAttribute("href", animeInfo.public_url)

    //OGP画像が見つからなければnoimage画像を表示する
    if (imageURL) {
        document.getElementById('image').setAttribute("src", imageURL)
    } else {
        document.getElementById('image').setAttribute("src", 'public/noimage-760x460.png')
    }

    //1000ミリ秒空けてローディング画面を削除
    await setTimeout(() => {
        document.getElementById("loading").remove();
    }, 1000);
}
main();

