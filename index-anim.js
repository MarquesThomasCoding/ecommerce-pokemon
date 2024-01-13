// Initialisation de la variable qui contiendra la dernière position de scroll
let lastScrollPosition = 0;

// Récupération de la navbar et de la search-section dans le DOM
const navbar = document.querySelector('nav');
const searchSection = document.querySelector('.search-section');
const searchSectionTop = searchSection.computedStyleMap().get('top').value;

// Fonction pour animer la navbar et la search-section
const animateNavbar = () => {
    // Initialisation des variables pour le déplacement de la navbar et de position de la search-section
    let moveTop = '-60px';
    let searchSectionTop = '60px'

    // Si la largeur de la fenêtre est inférieure à 450px, changement des variables
    if(window.innerWidth < 450) {
        moveTop = '-120px';
        searchSectionTop = '120px'
    }
    
    // Récupération de la position de scroll actuelle
    const currentScrollPosition = window.scrollY;

    // Si la position de scroll actuelle est supérieure à la dernière position de scroll
    if (currentScrollPosition > lastScrollPosition) {
        // Déplacement de la navbar et de la search-section
        navbar.style.top = moveTop;
        searchSection.style.top = '0';
    }
    // Sinon
    else {
        // Replacement de la navbar et de la search-section
        navbar.style.top = '0';
        searchSection.style.top = searchSectionTop;
    }
    // Mise à jour de la dernière position de scroll
    lastScrollPosition = currentScrollPosition;
}

// Ecoute de l'événement scroll sur la fenêtre
window.addEventListener('scroll', () => {
    // Appel de la fonction animateNavbar
    animateNavbar();
});