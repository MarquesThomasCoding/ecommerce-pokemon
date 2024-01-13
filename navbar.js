// Initialisation de la variable qui contiendra la dernière position de scroll
let lastScrollPosition = 0;

// Récupération de la navbar dans le DOM
const navbar = document.querySelector('nav');

// Fonction pour animer la navbar
const animateNavbar = () => {
    // Initialisation de la variable pour le déplacement de la navbar
    let moveTop = '-60px';

    // Si la largeur de la fenêtre est inférieure à 450px, changement de la variable
    if(window.innerWidth < 450) {
        moveTop = '-120px';
    }
    
    // Récupération de la position de scroll actuelle
    const currentScrollPosition = window.scrollY;

    // Si la position de scroll actuelle est supérieure à la dernière position de scroll
    if (currentScrollPosition > lastScrollPosition) {
        // Déplacement de la navbar
        navbar.style.top = moveTop;
    }
    // Sinon
    else {
        // Replacement de la navbar
        navbar.style.top = '0';
    }

    // Mise à jour de la dernière position de scroll
    lastScrollPosition = currentScrollPosition;
}

// Ecoute de l'événement scroll sur la fenêtre
window.addEventListener('scroll', () => {
    // Appel de la fonction animateNavbar
    animateNavbar();
});