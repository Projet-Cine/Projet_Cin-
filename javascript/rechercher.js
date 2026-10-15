
const searchform= document.querySelector('.search-form');
const searchinput= document.querySelector('input[name="query"]');
const searchresults= document.getElementById('search-results');

const apiKey = "3962e052";

// Empêcher le rechargement de la page
searchform.addEventListener('submit', function(event) {
    event.preventDefault();
});


// Recherche en temps réel
searchinput.addEventListener('input', function() {
    const recherche= searchinput.value.trim();

    if (recherche.length < 2){
        searchresults.innerHTML="";
        return;
        
    }

    rechercherFilms(recherche);
});



// Récupération des films depuis OMDb
async function rechercherFilms(recherche) {

    try {
        const reponse = await fetch(
            `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(recherche)}`
        );

        if (!reponse.ok) {
            throw new Error("Erreur HTTP : " + reponse.status);
        }

        const data = await reponse.json();

        searchresults.innerHTML = "";

        if (data.Response === "False") {
            searchresults.textContent = data.Error || "Aucun film trouvé.";
            return;
        }

        data.Search.forEach(function(film) {

            const cart = document.createElement("div");
            cart.classList.add("films");

            const titre = document.createElement("h3");
            titre.textContent = film.Title;

            const affiche = document.createElement("img");

            affiche.src = film.Poster !== "N/A"
                ? film.Poster
                : "/img/placeholder.png";

            affiche.alt = `Affiche du film ${film.Title}`;

            const lien = document.createElement("a");
            lien.href = `movie.html?id=${encodeURIComponent(film.imdbID)}`;
            lien.textContent = "En savoir plus";

            cart.append(affiche, titre, lien);
            searchresults.appendChild(cart);
        });

    } catch (erreur) {
        console.error(erreur);
        searchresults.textContent = "Erreur lors du chargement des films.";
    }
}

