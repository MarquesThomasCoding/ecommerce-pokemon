// Récupération ou initialisation du panier ('cart') dans le localStorage
let shoppingCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

// Fonction pour ajouter un Pokémon au panier
const addToCart = (pokemon) => {
    // Afficher une confirmation
    showConfirmation(pokemon);
    // Si le panier contient déjà le Pokémon, on ne fait rien
    if(shoppingCart.includes(pokemon)) {
        return;
    }
    // Ajouter le Pokémon au panier
    shoppingCart.push(pokemon);
    // Enregistrer le panier dans le localStorage
    localStorage.setItem('cart', JSON.stringify(shoppingCart));
}

// Fonction pour afficher une confirmation
const showConfirmation = (pokemon) => {
    // Récupération de la pop-up de confirmation dans le DOM
    const popUpValidation = document.querySelector('.pop-up-validation');
    // Affichage de la pop-up
    popUpValidation.classList.remove('hidden');
    // Si le panier contient déjà le Pokémon, on affiche : 'Already in cart !'
    if(shoppingCart.includes(pokemon)) {
        popUpValidation.textContent = 'Already in cart !';
    }
    // Sinon, on affiche : 'Added to cart !'
    else {
        popUpValidation.textContent = 'Added to cart !';
    }
    // On cache la pop-up après 2 secondes
    setTimeout(() => {
        popUpValidation.classList.add('hidden');
    }, 2000);
}