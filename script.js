const url = "https://newsapi.org/v2/top-headlines?category=sports&apiKey=1ef23307d2ee407891ed287fa8ff526b";


function fetchNews() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.status !== "ok") throw new Error("Error en la API");

            const articles = data.articles.slice(0, 10); // Tomar solo 10 noticias
            let newsHTML = "", slideContent = "";

            articles.forEach((article, index) => {
                if (index % 3 === 0) slideContent = `<div class="carousel-item ${index === 0 ? 'active' : ''}"><div class="row">`;

                slideContent += `
                    <div class="col-md-4">
                        <div class="card h-100 shadow-sm">
                            <img src="${article.urlToImage || 'default.jpg'}" class="card-img-top" alt="Imagen">
                            <div class="card-body">
                                <h5 class="card-title">${article.title}</h5>
                                <p class="card-text">${article.description || "No disponible."}</p>
                                <a href="${article.url}" target="_blank" class="btn btn-primary">Leer más</a>
                            </div>
                        </div>
                    </div>`;

                if (index % 3 === 2 || index === articles.length - 1) {
                    slideContent += `</div></div>`; // Cerrar `row` y `carousel-item`
                    newsHTML += slideContent;
                }
            });

            document.getElementById("news-container").innerHTML = newsHTML;
        })
        .catch(error => {
            console.error("Error obteniendo noticias:", error);
            document.getElementById("news-container").innerHTML = "<p class='text-center text-danger'>No se pudieron cargar las noticias.</p>";
        });
}

window.onload = fetchNews;