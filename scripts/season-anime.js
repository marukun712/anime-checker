import { createAnimeInfoCard, fetchSeasonAnimes } from './utils.js';

const searchParams = new URLSearchParams(window.location.search);

//クエリパラメータから年とクールを取得
let year = searchParams.get("year")
let season = searchParams.get("season")

async function main() {
    let seasonText;

    if (season == 1) {
        seasonText = "冬"
    } else if (season == 2) {
        seasonText = "春"
    } else if (season == 3) {
        seasonText = "夏"
    } else if (season == 4) {
        seasonText = "秋"
    }

    document.getElementById("seasonText").innerHTML = `${year}年 ${seasonText}アニメ`

    //year,seasonを元にアニメデータを取得
    let animeData = await fetchSeasonAnimes(year, season);
    if (animeData.length == 0) {
        document.getElementById("main").innerHTML = `${year}年 ${seasonText}アニメの情報が見つかりませんでした。`
    }

    let cardArea = document.getElementById("cardarea");

    animeData.map(data =>
        //アニメ情報カードを作成
        createAnimeInfoCard(year, season, data, cardArea)
    )

    //ローディング画面を削除
    await document.getElementById("loading").remove();
}
main();

