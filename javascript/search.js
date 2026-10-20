
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



// On retient la recherche en cours et la page affichée
let rechercheActuelle = "";
let pageActuelle = 1;

// Récupération des films depuis OMDb
async function rechercherFilms(recherche, page = 1) {

    try {
        const reponse = await fetch(
            `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(recherche)}`
        );

        // Si le serveur répond avec une erreur (404, 500...), on passe au catch
        if (!reponse.ok) {
            throw new Error("Erreur HTTP : " + reponse.status);
        }

        // Conversion de la réponse en objet JavaScript
        const data = await reponse.json();

        // On vide les anciens résultats avant d'afficher les nouveaux
       if (page === 1) {
            searchresults.innerHTML = "";
            rechercheActuelle = recherche;
            pageActuelle = 1;
        }
        
        // L'API renvoie "False" quand il n'y a aucun résultat
        if (data.Response === "False") {
            searchresults.textContent = data.Error || "Aucun film trouvé.";
            return;
        }

        data.Search.forEach(function(film) {

            // Conteneur de la carte
            const cart = document.createElement("div");
            cart.classList.add("films");

             // Titre du film
            const titre = document.createElement("h3");
            titre.textContent = film.Title;

             // Affiche du film
            const affiche = document.createElement("img");

            // Si l'API n'a pas d'affiche, on met une image par défaut
            affiche.src = film.Poster !== "N/A"
                ? film.Poster
                : "img/poster.jpg";

            // Description de l'image (utile si elle ne s'affiche pas, et pour les malvoyants)
            affiche.alt = `Affiche du film ${film.Title}`;

            // Lien vers la page de détails, avec l'identifiant IMDb du film dans l'URL
            const lien = document.createElement("a");
            lien.href = `movie.html?id=${encodeURIComponent(film.imdbID)}`;
            lien.textContent = "En savoir plus";

            // On place l'affiche, le titre et le lien dans la carte, puis on affiche la carte sur la page
            cart.append(affiche, titre, lien);
            searchresults.appendChild(cart);
        });

        // Si tous les films sont affichés, on cache le bouton
        if (page * 10 >= Number(data.totalResults)) {
            btnVoirPlus.style.display = "none";
        } else {
            btnVoirPlus.style.display = "block";
        }

    } catch (erreur) {
        // Erreur réseau ou erreur HTTP lorsque la page met du temp à charger
        console.error(erreur);
        searchresults.textContent = "Erreur lors du chargement des films.";
    }
}
// À chaque clic, on charge la page suivante de la même recherche
btnVoirPlus.addEventListener("click", function() {
    pageActuelle++;
    rechercherFilms(rechercheActuelle, pageActuelle);
});


