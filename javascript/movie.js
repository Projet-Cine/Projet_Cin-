const params = new URLSearchParams(window.location.search);
const idFilm = params.get('id');

const apiKey = '3962e052'

async function afficherFilm() {

    if (!idFilm) {
        document.getElementById("film-titre").textContent =
        "Aucun film sélectionné.";
        return;
    }

    try {
        const reponse = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&i=${encodeURIComponent(idFilm)}&plot=full`
    );

    if(!reponse.ok) {
        throw new Error("Erreur HTTP : " + reponse.status);
    }
        const film = await reponse.json();

        if(film.reponse === "False"){
            document.getElementById("film-titre").textContent =
            film.Error || "Film introuvable.";
            return;
        }

        document.getElementById("film-titre").textContent = film.Title;
        document.getElementById("film-genre").textContent = film.Genre;
        document.getElementById("film-description").textContent = film.Plot;
        document.getElementById("film-acteurs").textContent = film.Actors;
        document.getElementById("film-realisateur").textContent = film.Director;
        document.getElementById("film-note").textContent = 

        film.imdbRating !== "N/A" ? `${film.imdbRating}/10` : "Non disponible";

        const poster = document.getElementById("film-poster");

        if (film.Poster !== "N/A") {
            poster.src = film.Poster;
            poster.alt = `Affiche du film ${film.Title}`;
        } else {
            poster.hidden = true;
        }

        const dvd = document.getElementById("film-dvd");

        if(film.DVD && film.DVD !== "N/A"){
            const date = new Date(film.DVD);

            dvd.textContent = isNaN(date.getTime())
            ? film.DVD
            : date.toLocaleDateString("fr-FR");
        } else {
            dvd.textContent = "Non disponible";
        }
        } catch(erreur){
            console.error(erreur);
            document.getElementById("film-titre").textContent =
            "Impossible de charger les informations du film";

    }
    
}

afficherFilm();