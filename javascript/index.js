export const API_KEY = 'b30ce6ed';
export const BASE_URL = 'https://www.omdbapi.com/';

export async function chercherFilms(terme, page, annee) {
  let url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(terme)}&type=movie&page=${page}`;
  if (annee) {
    url += `&y=${annee}`;
  }
  const reponse = await fetch(url);
  const donnees = await reponse.json();
  if (donnees.Response === "False") {
    return [];
  }
  console.log()
  return donnees.Search;
}


async function recupererFilm(titre) {
  const url = `${BASE_URL}?apikey=${API_KEY}&t=${encodeURIComponent(titre)}`;
  const reponse = await fetch(url);
  const film = await reponse.json();
  console.log(film);
  return film;
}


const TITRES_TENDANCES = ["Obsession", "Project Hail Mary", "The Odyssey"];

function creerCarte(film) {
  const resume = film.Plot ? `<p>${film.Plot}</p>` : "";
  return `
  <article class="carte-film">
    <img src="${film.Poster}" alt="Affiche de ${film.Title}"></img>
    <h3>${film.Title}</h3>
    <p>${film.Year}</p>
    <p>${film.Director}</p>
    ${resume}
    <a href="./movie.html?id=${film.imdbID}">En savoir plus</a>
  </article>
  `;
}

async function afficherTendances() {
  const conteneur = document.querySelector(".films_tendances");
  conteneur.innerHTML = "";

  for (const titre of TITRES_TENDANCES) {
    const film = await recupererFilm(titre);
    conteneur.insertAdjacentHTML("beforeend", creerCarte(film));
  }
}


afficherTendances();


const TERME_2026 = "man";
let pageApi = 1;
let reserve = [];

function creerPetiteCarte(film) {
  return `
  <article class="carte-film">
    <img src="${film.Poster}" alt="Affiche de ${film.Title}"></img>
    <h3>${film.Title}</h3>
    <p>${film.Year}</p>
    <a href="./movie.html?id=${film.imdbID}">En savoir plus</a>
  </article>
  `;
}


// Affichage de 5 films, Omdb en affiche 10 par page
// donc on doit limiter les résulats en utilisant une réserve
async function chargerPlus() {
  const bouton = document.getElementById("charger_plus");

  // S'il ,reste moins de 5 films en réserve : on va en chercher 10 de plus
  if (reserve.length < 5) {
    const nouveaux = await chercherFilms(TERME_2026, pageApi, 2026);
    reserve.push(...nouveaux);  
    pageApi++;
  }

  // On prend 5 films dans la réserve et on les affiche
  const cinqFilms2026 = reserve.splice(0, 5);
  const conteneur = document.getElementById("liste-2026");
  for (const film of cinqFilms2026) {
    conteneur.insertAdjacentHTML("beforeend", creerPetiteCarte(film));
  }

  // Si on a épuisé la réserve, on cache le bouton "charger_plus"
  if (reserve.length === 0 && cinqFilms2026.length < 5) {
    bouton.style.display = "none";
  }
}

document.getElementById("charger_plus").addEventListener("click", chargerPlus);
chargerPlus();

