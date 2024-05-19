const API_KEY = `8a380428dc1041f6a6f7a3ef818e5d6a`
let newsList = [];

const menus = document.querySelectorAll(".menus button");
menus.forEach(menu => menu.addEventListener("click", (event) => getNewsByCategory(event)))

let url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`)

let totalResult = 0
let page = 1
const pageSize = 10
const groupSize = 5


const getNews = async () => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (response.status === 200) {
            if (data.articles.length === 0) {
                throw new Error("No result for this section")
            }
            newsList = data.articles;
            totalResult = data.totalResults
            render();
        } else {
            throw new Error(data.massage);
        }

    } catch (error) {
        errorRender(error.Message)
    }

}


const getLatestNews = async () => {
    url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    getNews();
};

const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase();
    url = new URL(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`);
    getNews()
}

const getNewsByKeyword = async () => {
    const keyword = document.getElementById("serch-input").value;
    url = new URL(`https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`)
    getNews()
};

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

    document.getElementById("news-board").innerHTML = newsHTML;
};

const errorRender = (errorMessage) => {
    const errorHTML = `<div class="alert alert-danger" role="alert">
    ${errorMessage}
  </div>`;

    document.getElementById("news-board").innerHTML = errorHTML;
};

const paginationRender = () => {
    //totalResult 
    //page
    //pageSize
    //groupSize

    //pageGroup
    const pageGroup = Math.ceil(page / groupSize);
    //lastPage
    const lastPage = pageGroup * groupSize
    //firstPage
    const firstPage = lastPage - (groupSize - 1);

    const paginationHTML = ``;

    for (let i = firstPage; i <= lastPage; i++) {
        paginationHTML += `<li class="page-item"><a class="page-link" href="#">${i}</a></li>`
    }

    document.querySelector(".pagination").innerHTML = paginationHTML;

};

getLatestNews();

