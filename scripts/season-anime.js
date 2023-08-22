import { createAnimeInfoCard, fetchSeasonAnimes } from './utils';

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
    let cardArea = document.getElementById("cardarea");

    animeData.map(data =>
        //アニメ情報カードを作成
        createAnimeInfoCard(year, season, data, cardArea)
    )

    //2000ミリ秒空けてローディング画面を削除
    await setTimeout(() => {
        document.getElementById("loading").remove();
    }, 2000);
}
main();

