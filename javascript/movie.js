// Lit l'id du film dans l'URL
const params = new URLSearchParams(window.location.search);
const idFilm = params.get('id');

// Clé pour utiliser l'API OMDb
const apiKey = '3962e052'

// Fonction qui récupère le film et l'affiche dans la page
async function afficherFilm() {

    // Si aucun id dans l'URL, on affiche un message et on arrête
    if (!idFilm) {
        document.getElementById("film-titre").textContent =
        "Aucun film sélectionné.";
        return;
    }

    try {

        // Envoie la requête à l'API avec l'id du film
        // encodeURIComponent protège l'id si il contient des caractères spéciaux
        const reponse = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&i=${encodeURIComponent(idFilm)}&plot=full`
    );

    // Si le serveur répond avec une erreur (404, 500...), on passe au catch
    if(!reponse.ok) {
        throw new Error("Erreur HTTP : " + reponse.status);
    }
        // Transformer la réponse JSON en objet JavaScript
        const film = await reponse.json();

        // L'API répond "False" quand le film n'existe pas
        if(film.Reponse === "False"){
            document.getElementById("film-titre").textContent =
            film.Error || "Film introuvable.";
            return;
        }

        // Remplit la page avec les infos du film
        document.getElementById("film-titre").textContent = film.Title;
        document.getElementById("film-genre").textContent = film.Genre;
        document.getElementById("film-description").textContent = film.Plot;
        document.getElementById("film-acteurs").textContent = film.Actors;
        document.getElementById("film-realisateur").textContent = film.Director;
        document.getElementById("film-note").textContent = 

        // Note : si l'API ne donne pas de note ("N/A"), on affiche un texte à la place
        film.imdbRating !== "N/A" ? `${film.imdbRating}/10` : "Non disponible";

        // Affiche du film
        const poster = document.getElementById("film-poster");

        if (film.Poster !== "N/A") {
            poster.src = film.Poster;
            poster.alt = `Affiche du film ${film.Title}`;
        } else {
            // Pas d'affiche 
            poster.hidden = true;
        }

        //Date de sortie du film
    const sortie = document.getElementById("film-sortie");
 
    if (film.Released && film.Released !== "N/A") {
      const date = new Date(film.Released);
 
      // Si la date est invalide, on affiche le texte brut
      // Sinon on l'affiche au format français (jj/mm/aaaa)
      sortie.textContent = isNaN(date.getTime())
        ? film.Released
        : date.toLocaleDateString("fr-FR");
    } else {
      sortie.textContent = "Non disponible";
    }
        } catch(erreur){
            //En cas de problème, on affiche un message
            console.error(erreur);
            document.getElementById("film-titre").textContent =
            "Impossible de charger les informations du film";

    }
    
}
//Lance la fonction au chargement de la page
afficherFilm();