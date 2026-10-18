
function header () {
    return `
    <header class="header">
        <a href="/index.html" class="logo">
            <img src="/img/Logo cinéma.png" alt="logo cinéma" class="logo">
        </a>                </li>
        <a href="/index.html" class="nav-link">Accueil</a>
        <a href="/contact.html" class="nav-link">Contact</a>
        <a href="./search.html" id="icone_recherche">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
            style="filter: drop-shadow(0 0 6px #ff0000) drop-shadow(0 0 12px #ff2e88);">
            <circle cx="12" cy="11" r="6" stroke="#fff" stroke-width="2"/>
            <line x1="9" y1="15" x2="4" y2="21" stroke="#fff" stroke-width="2"/>
            </svg>
        </a>
    </header>`;
        }

async function appelHeader() {
    const conteneur = document.querySelector("header");
    conteneur.insertAdjacentHTML("beforeend", header());
}

document.addEventListener("DOMContentLoaded", appelHeader);




function footer () {
    return `
        <div class="footer-logo">
            <a href="#logo">
                <img src="/img/Logo cinéma.png" alt="logo Cinéma">
            </a>
        </div>
        <div class="footer-links">
            <a class="page-link" href="/index.html">Accueil</a>
            <a class="page-link" href="/contact.html">Contact</a>
        </div>
        <div class="footer-reseau">
            <a class="reseau_lien" href="./index.html" aria-label="Instagram">
                <i class="fa-brands fa-instagram"></i>
            </a>
            <a class="reseau_lien" href="./index.html" aria-label="Facebook">
                <i class="fa-brands fa-facebook-f"></i>
            </a>
            <a class="reseau_lien" href="./index.html" aria-label="Youtube">
                <i class="fa-brands fa-youtube"></i>
            </a>
        </div>
        <div class="footer-bottom">
            <p>
                &copy; 2026 - Athanase NGAIPORO-YAGBENGUE & Florent REGNIER. All rights reserved.
            </p>
        </div>
    `;
        }

async function appelFooter() {
    const conteneur = document.querySelector("Footer");
    conteneur.insertAdjacentHTML("beforeend", footer());
}

document.addEventListener("DOMContentLoaded", appelFooter);
    
    
