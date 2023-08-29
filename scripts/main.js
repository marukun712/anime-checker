import { returnCurrentSeason, returnCurrentYear, createAnimeInfoCard, fetchSeasonAnimes } from './utils.js';

//現在の年、クールを取得
let year = returnCurrentYear();
let season = returnCurrentSeason();

async function main() {
    //year,seasonを元にアニメデータを取得
    let animeData = await fetchSeasonAnimes(year, season);
    let cardArea = document.getElementById("cardarea");

    animeData.map(data =>
        //アニメ情報カードを作成
        createAnimeInfoCard(year, season, data, cardArea)
    )

    //ローディング画面を削除
    await document.getElementById("loading").remove();

}
main();

