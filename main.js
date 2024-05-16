const API_KEY = `8a380428dc1041f6a6f7a3ef818e5d6a`
let newsList = [];

const menus = document.querySelectorAll(".menus button");
menus.forEach(menu => menu.addEventListener("click", (event) => getNewsByCategory(event)))
const getLatestNews = async () => {
    const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    const response = await fetch(url);
    const data = await response.json();
    newsList = data.articles;
    render();
    console.log("dddd", newsList);
};

const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase();
    console.log("category", category);
    const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`);
    const response = await fetch(url);
    const data = await response.json();
    console.log("ddd", data);
    newsList = data.articles;
    render();
}

const getNewsByKeyword = () => {
    const keyword = document.getElementById("serch-input").value;
    console.log("keyword",keyword)
}
const render = () => {
    const newsHTML = newsList.map(
        (news) => `<div class="row news">
        <div class="col-lg-4">
            <img class="news-img-size" src=${news.urlToImage} />
        </div>
        <div class="col-lg-8">
            <h2>${news.title}</h2>
            <p>${news.description}</p>
            <div>
            ${news.source.name} * ${news.publishedAt}
            </div>
        </div>

    </div>`
    ).join('');
    console.log("html", newsHTML);

    document.getElementById("news-board").innerHTML = newsHTML;
};

getLatestNews();

