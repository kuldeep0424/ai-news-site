const API_KEY = '19416213a66c4cedad67f1192f9c7a70';
const API_URL = `https://newsapi.org/v2/everything?q=artificial+intelligence&apiKey=${API_KEY}`;

async function fetchNews() {
    const container = document.getElementById('news-container');
    container.innerHTML = '<p>Loading news...</p>';

    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        container.innerHTML = ''; // Purani news clear karo

        if (data.articles && data.articles.length > 0) {
            data.articles.forEach(article => {
                const newsItem = document.createElement('article');
                newsItem.innerHTML = `
                    <h2>${article.title}</h2>
                    <p>${article.description || 'No description available.'}</p>
                    <a href="${article.url}" target="_blank">Read More</a>
                `;
                container.appendChild(newsItem);
            });
        } else {
            container.innerHTML = '<p>No news available. Try again later.</p>';
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        container.innerHTML = '<p>Failed to load news. Please try again later.</p>';
    }
}

// Website load hote hi news fetch karo
fetchNews();
