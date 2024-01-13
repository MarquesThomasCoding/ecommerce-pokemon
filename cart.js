let shoppingCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];


const removeFromCart = (pokemon) => {
    shoppingCart = shoppingCart.filter((cartPokemon) => cartPokemon !== pokemon);
    localStorage.setItem('cart', JSON.stringify(shoppingCart));
    displayCart();
}

const displayCart = async () => {
    const cart = document.querySelector('table.cart-list tbody');
    cart.innerHTML = '';

    // Fonction asynchrone pour récupérer les données du Pokémon
    const fetchPokemonData = async (pokemon) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        const pokemonData = await response.json();
        return pokemonData;
    };

    // Parcourir le panier (en attendant que toutes les requêtes asynchrones soient terminées)
    Promise.all(shoppingCart.map(async (pokemon) => {
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

        return parseFloat(cartPokemonPrice.textContent.replace(' $', '')); // Retourne le prix pour la sommation
    }))
    // Une fois que toutes les requêtes asynchrones sont terminées, nous pouvons calculer le prix total
    .then((prices) => {
        // À ce stade, toutes les requêtes asynchrones sont terminées
        let totalPrice = prices.reduce((acc, price) => acc + price, 0);

        // Afficher le prix total
        document.querySelector('.total-price-value').textContent = totalPrice;
    });
}

displayCart();