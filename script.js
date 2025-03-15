const apiKey = "19416213a66c4cedad67f1192f9c7a70"; 
const apiUrlIndia = `https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=${apiKey}`;
const apiUrlUSA = `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${apiKey}`;

// ✅ Fetch News Function
async function fetchNews(apiUrl) {
    try {
        const res = await fetch(apiUrl);
        const data = await res.json();

        console.log("API Response:", data);

        if (!data.articles || data.articles.length === 0) {
            console.log("No articles found in India, switching to USA...");
            const resUSA = await fetch(apiUrlUSA);
            const dataUSA = await resUSA.json();

            if (!dataUSA.articles || dataUSA.articles.length === 0) {
                document.getElementById("news-container").innerHTML = "<p>No news available. Try again later.</p>";
                return;
            }

            displayNews(dataUSA.articles);
        } else {
            displayNews(data.articles);
        }
    } catch (error) {
        console.error("Error fetching news:", error);
        document.getElementById("news-container").innerHTML = "<p>Failed to load news.</p>";
    }
}

// ✅ Display News Function
function displayNews(articles) {
    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = ""; 

    articles.forEach(article => {
        const newsItem = document.createElement("div");
        newsItem.className = "news-item";
        newsItem.innerHTML = `
            <h2>${article.title}</h2>
            <p>${article.description || "No description available."}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;
        newsContainer.appendChild(newsItem);
    });
}

fetchNews(apiUrlIndia);
