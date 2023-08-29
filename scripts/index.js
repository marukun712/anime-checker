//クール検索の準備
var year = new Date().getFullYear();

var startYear = 2014

var num = year - startYear + 1

for (i = 0; i < num; i++) {
    document.getElementById("years").insertAdjacentHTML("beforeend", `<option>${year--}</option>`)
}

//searchButtonが押されたら発火
document.getElementById("searchButton").addEventListener("click", () => {
    //yearとseasonを取得する
    let years = document.getElementById('years');
    let year = years.value;

    let seasons = document.getElementById('seasons');
    let season = seasons[seasons.selectedIndex].id

    //クールごとのアニメ情報ページに遷移
    window.location.href = `season-anime.html?year=${year}&season=${season}`;
})

//検索ボックスの処理
let form = document.getElementById("search");

form.addEventListener('keypress', (e) => {
    //enterキーを押されたら遷移
    if (e.keyCode === 13) {
        let title = form.value;
        //検索ページに遷移
        window.location.href = `search.html?title=${title}`;
    }
})

//アニメをお気に入りに追加
function addLiked(id) {
    let urlDom = document.getElementById(`${id}_url`);
    let url = urlDom.getAttribute("href")
    let title = urlDom.children[0].innerText;
    console.log(urlDom)

    let imageDom = document.getElementById(`${id}_image`);
    let image = imageDom.getAttribute("src")

    let data = {
        "title": title,
        "imageURL": image,
        "URL": url
    }

    let json = JSON.stringify(data)

    //localstrageに保存
    localStorage.setItem(id, json)
}

//アニメをお気に入りから削除
function removeLiked(id) {
    //確認モーダルを開く
    my_modal_6.showModal()
    document.getElementById("removeButton").setAttribute("onclick", `localStorage.removeItem(${id})`)
}