//カードを作成
function createLikedAnimeCard(position, key, title, imageURL, url) {
    position.insertAdjacentHTML("beforeend",
        `
        <div class="2xl:p-3 p-1 z-0" id="${key}">
            <div class="card glass w-36 h-52 2xl:w-52 2xl:h-52">
                <figure class="h-24"><img src="${imageURL}"alt="image"/></figure>
                <div class="card-body">
                    <a href="${url}">
                        <p class="truncate">${title}</p>
                    </a>

                    <button class="btn btn-error 2xl:w-32 h-12 w-24" onclick="removeLiked(${key})">お気に入りから削除</button>
                </div>
            </div>
        </div>
        `
    )
}

//localstrageから全ての情報を取得
for (var key in localStorage) {
    let json = localStorage.getItem(key)
    let item = JSON.parse(json)

    let title = item.title;
    let imageURL = item.imageURL;
    let url = item.URL;
    let position = document.getElementById("cardarea");

    //カードを作成
    createLikedAnimeCard(position, key, title, imageURL, url)
}
