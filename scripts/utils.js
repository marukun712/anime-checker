//現在のクールIDを返す
export function returnCurrentSeason() {
    let day = new Date();

    //月を取得
    let month = day.getMonth();

    //1-3月は 1 4-6月は 2 7-9月は 3 10-12月は 4 を返す
    if (month < 4) {
        return 1
    } else if (month >= 4 && month < 7) {
        return 2
    } else if (month >= 7 && month < 10) {
        return 3
    } else if (month >= 10 && month < 12) {
        return 4
    }
}

//現在の年を返す
export function returnCurrentYear() {
    let day = new Date();
    let year = day.getFullYear();

    return year;
}

//year,seasonからアニメ情報を取得
export async function fetchSeasonAnimes(year, season) {
    let url = await `https://anime-api.deno.dev/anime/v1/master/${year}/${season}`;

    let targetSeasonAnimes = await fetch(url);

    let targetSeasonAnimesJson = await targetSeasonAnimes.json()

    return await targetSeasonAnimesJson;
}

//urlからDOMを取得する
export function fetchDOM(url) {
    let proxyUrl = `https://cors-proxy-62vy.onrender.com/${url}`

    return fetch(proxyUrl)
        .then(res => res.text())
        .then(text => {
            return text
        })
}

//アニメ情報カードを作成
export async function createAnimeInfoCard(year, season, data, position) {
    /*
    //OGP画像の取得
    let text = await fetchDOM(data.public_url)

    let imageURL;

    const el = new DOMParser().parseFromString(text, "text/html")
    const headEls = (el.head.children)

    Array.from(headEls).map(v => {
        const prop = v.getAttribute('property')
        if (prop === "og:image") {
            imageURL = v.getAttribute("content")
        }
    })

    //OGP画像が見つからなければnoimage画像を表示する
    if (!imageURL) {
        imageURL = 'public/noimage-760x460.png'
    }
    */

    let imageURL = 'public/ogp.png'

    //お気に入りに登録されているか
    if (localStorage.getItem(data.id)) {
        await position.insertAdjacentHTML("beforeend",
            `
        <div class="2xl:p-3 p-1" id="${data.id}">
            <div class="card glass w-36 h-52 2xl:w-52 2xl:h-52">
                <a href=anime-info.html?year=${year}&season=${season}&id=${data.id}>
                    <figure class="h-24"><img src="${imageURL}"alt="image" id="${data.id}_image"/></figure>
                </a>
                <div class="card-body">
                    <a href=anime-info.html?year=${year}&season=${season}&id=${data.id} id="${data.id}_url">
                        <p class="truncate">${data.title}</p>
                    </a>

                    <button class="btn btn-error 2xl:w-32 h-12 w-24" onclick="removeLiked(${data.id})">お気に入りから削除</button>
                </div>
            </div>
        </div>
        `
        )
    } else {
        await position.insertAdjacentHTML("beforeend",
            `
        <div class="2xl:p-3 p-1" id="${data.id}">
            <div class="card glass w-36 h-52 2xl:w-52 2xl:h-52">
                <a href=anime-info.html?year=${year}&season=${season}&id=${data.id}>
                    <figure class="h-24"><img src="${imageURL}"alt="image" id="${data.id}_image"/></figure>
                </a>
                <div class="card-body">
                    <a href=anime-info.html?year=${year}&season=${season}&id=${data.id} id="${data.id}_url">
                        <p class="truncate">${data.title}</p>
                    </a>

                    <button class="btn btn-warning 2xl:w-32 h-12 w-24" onclick="addLiked(${data.id})">お気に入りに追加</button>
                </div>
            </div>
        </div>
        `
        )
    }
};

