// Récupération ou initialisation du panier ('cart') dans le localStorage
let shoppingCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

// Fonction pour retirer un Pokémon du panier
const removeFromCart = (pokemon) => {
    // Retirer le Pokémon du panier
    shoppingCart = shoppingCart.filter((cartPokemon) => cartPokemon !== pokemon);
    // Enregistrer le panier dans le localStorage
    localStorage.setItem('cart', JSON.stringify(shoppingCart));
    // Afficher le panier
    displayCart();
}

// Fonction asynchrone pour récupérer les données du Pokémon
const fetchPokemonData = async (pokemon) => {
    // Récupérer les données du Pokémon via un fetch de l'API
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    // Récupérer les données au format JSON
    const pokemonData = await response.json();
    // Retourner les données du Pokémon
    return pokemonData;
};

// Fonction asynchrone pour afficher le panier
const displayCart = async () => {
    // Récupérer le panier dans le DOM
    const cart = document.querySelector('table.cart-list tbody');
    // Vider le panier
    cart.innerHTML = '';

    // Parcourir le panier (en attendant que toutes les requêtes asynchrones soient terminées)
    Promise.all(shoppingCart.map(async (pokemon) => {
        // Récupérer les données du Pokémon via un fetch de l'API
        const pokemonData = await fetchPokemonData(pokemon);

        // Créer la ligne du tableau
        const cartPokemonTr = document.createElement('tr');
        cartPokemonTr.classList.add('cart-pokemon');
        cart.appendChild(cartPokemonTr);

        // Créer la cellule de nom
        const cartPokemonName = document.createElement('td');
        const cartPokemonNameLink = document.createElement('a');
        cartPokemonNameLink.href = 'product.html?pokemon=' + pokemon;
        cartPokemonName.classList.add('cart-pokemon-name');
        cartPokemonNameLink.textContent = pokemon;
        cartPokemonName.appendChild(cartPokemonNameLink);
        cartPokemonTr.appendChild(cartPokemonName);

        // Créer la cellule d'image
        const cartPokemonImgTd = document.createElement('td');
        const cartPokemonImg = document.createElement('img');
        cartPokemonImg.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemonData.id + ".png";
        cartPokemonImg.classList.add('cart-pokemon-img');
        cartPokemonImgTd.appendChild(cartPokemonImg);
        cartPokemonTr.appendChild(cartPokemonImgTd);

        // Créer la cellule de prix
        const cartPokemonPriceTd = document.createElement('td');
        const cartPokemonPrice = document.createElement('span');
        cartPokemonPrice.classList.add('cart-pokemon-price');
        cartPokemonPrice.textContent = Math.floor(Math.random() * 1000) + 1 + ' $';
        cartPokemonPriceTd.appendChild(cartPokemonPrice);
        cartPokemonTr.appendChild(cartPokemonPriceTd);

        // Créer la cellule de suppression
        const cartPokemonRemoveTd = document.createElement('td');
        const cartPokemonRemoveBtn = document.createElement('button');
        cartPokemonRemoveBtn.classList.add('cart-remove');
        cartPokemonRemoveBtn.id = pokemon;
        cartPokemonRemoveBtn.textContent = '🗑️';
        cartPokemonRemoveTd.appendChild(cartPokemonRemoveBtn);
        cartPokemonTr.appendChild(cartPokemonRemoveTd);

        // Ajouter un gestionnaire d'événement pour la suppression
        cartPokemonRemoveBtn.addEventListener('click', () => {
            removeFromCart(cartPokemonRemoveBtn.id);
        });

        // Retourner le prix du Pokémon pour le calcul du prix total
        return parseFloat(cartPokemonPrice.textContent.replace(' $', ''));
    }))
    // Une fois que toutes les requêtes asynchrones sont terminées, calculer le prix total
    .then((prices) => {
        // Calculer le prix total
        let totalPrice = prices.reduce((acc, price) => acc + price, 0);

        // Afficher le prix total
        document.querySelector('.total-price-value').textContent = totalPrice;
    });
}

// Afficher le panier
displayCart();