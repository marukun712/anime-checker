import { returnCurrentSeason, returnCurrentYear, createAnimeInfoCard, fetchSeasonAnimes } from './utils';

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

    //2000ミリ秒空けてローディング画面を削除
    await setTimeout(() => {
        document.getElementById("loading").remove();
    }, 2000);
}
main();

