// Définition de la variable qui contient le pokemon recherché
const queryString = window.location.search;

// Si la variable est vide, redirection vers la page d'accueil
if (queryString === '') {
    window.location.href = '/index.html'
}

// Récupération du pokemon recherché via la fonction URLSearchParams
const urlParams = new URLSearchParams(queryString);
// Récupération du pokemon recherché depuis l'url
const pokemon = urlParams.get('pokemon')

// Fonction pour récupérer les évolutions du Pokémon recherché
const recupEvolution = (pokemon) => {
    // Récupération des évolutions du Pokémon via un fetch de l'API et retour d'une promesse
    return new Promise((resolve, reject) => {
        // Initialisation du tableau qui contiendra les évolutions du Pokémon
        const pokemonEvolutions = []

        // Récupération des données du Pokémon via un fetch de l'API
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`)
        // Récupération des données au format JSON
        .then((response) => {
            const error = response.status

            // Si le Pokémon n'existe pas, on affiche un message d'erreur sur la page
            if (error === 404) {
                // On affiche un message d'erreur sur la page
                const errorMessage = document.createElement('h2')
                errorMessage.classList.add('error-message')
                errorMessage.textContent = 'Pokemon not found'
                document.querySelector('.pokemon-card').style.display = 'none'
                document.body.appendChild(errorMessage)
            }
            // Sinon, on retourne les données du Pokémon
            return response.json()
        })
        // Récupération des données au format JSON
        .then((data) => {
            // Récupération des données de l'évolution du Pokémon via un fetch de l'API
            fetch(data.evolution_chain.url)
            // Récupération des données au format JSON
            .then((response) => {
                const error = response.status

                // Si le Pokémon n'existe pas, on affiche un message d'erreur sur la page
                if (error === 404) {
                    // On affiche un message d'erreur sur la page
                    const errorMessage = document.createElement('h2')
                    errorMessage.classList.add('error-message')
                    errorMessage.textContent = 'Pokemon not found'
                    document.querySelector('.pokemon-card').style.display = 'none'
                    document.body.appendChild(errorMessage)
                }
                // Sinon, on retourne les données du Pokémon
                return response.json()
            })
            // Récupération des données au format JSON
            .then((data) => {
                // Initialisation du tableau qui contiendra les évolutions du Pokémon et leur id
                const poke = {}
                // Récupération du nom et de l'id du Pokémon
                poke.name = data.chain.species.name
                poke.id = data.chain.species.url.split('/')[6]
                // Ajout du Pokémon dans le tableau des évolutions
                pokemonEvolutions.push(poke)
                // Si le Pokémon a une évolution
                if (data.chain.evolves_to.length > 0) {
                    // Initialisation du tableau qui contiendra les évolutions du Pokémon et leur id
                    const poke = {}
                    // Récupération du nom et de l'id du Pokémon
                    poke.name = data.chain.evolves_to[0].species.name
                    poke.id = data.chain.evolves_to[0].species.url.split('/')[6]
                    // Ajout du Pokémon dans le tableau des évolutions
                    pokemonEvolutions.push(poke)
                    // Si le Pokémon a une évolution
                    if (data.chain.evolves_to[0].evolves_to.length > 0) {
                        // Initialisation du tableau qui contiendra les évolutions du Pokémon et leur id
                        const poke = {}
                        // Récupération du nom et de l'id du Pokémon
                        poke.name = data.chain.evolves_to[0].evolves_to[0].species.name
                        poke.id = data.chain.evolves_to[0].evolves_to[0].species.url.split('/')[6]
                        // Ajout du Pokémon dans le tableau des évolutions
                        pokemonEvolutions.push(poke)
                    }
                }
                // Retour des évolutions du Pokémon
                resolve(pokemonEvolutions);
            })
            // Gestion des erreurs
            .catch((error) => reject(error));
        })
        .catch((error) => reject(error));
    });
}


// Fonction asynchrone pour récupérer les données du Pokémon recherché
const recupPokemon = async () => {
    // Récupération des données du Pokémon via un fetch de l'API
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const error = data.status

    // Si le Pokémon n'existe pas, on affiche un message d'erreur sur la page
    if (error === 404) {
        // On affiche un message d'erreur sur la page
        const errorMessage = document.createElement('h2')
        errorMessage.classList.add('error-message')
        errorMessage.textContent = 'Pokemon not found'
        document.querySelector('.pokemon-card').style.display = 'none'
        document.body.appendChild(errorMessage)
    }
    // Sinon, on retourne les données du Pokémon
    else {
        // Récupération des données au format JSON
        const pokemonData = await data.json();

        // Récupération des évolutions du Pokémon
        const pokemonEvolutions = await recupEvolution(pokemon);

        // Récupération des données du Pokémon
        const pokemonName = pokemonData.name
        const pokemonImg = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + pokemonData.id + ".png"
        const pokemonTypes = pokemonData.types.map(type => type.type.name)
        const pokemonAbilities = pokemonData.abilities.map(ability => ability.ability.name)
        const pokemonStats = pokemonData.stats.map(stat => stat.stat.name + ' : <b>' + stat.base_stat + '</b>')

        // Création du prix du pokémon
        const pokemonPrice = Math.floor(Math.random() * 1000) + 1

        // Création du tableau qui contiendra les données du Pokémon
        const pokemonInfos = [pokemonName, pokemonImg, pokemonTypes, pokemonAbilities, pokemonStats, pokemonEvolutions, pokemonPrice]

        // Affichage du Pokémon
        displayPokemon(pokemonInfos)    
    }
}

// Fonction pour afficher le pokemon recherché
const displayPokemon = (pokemonInfos) => {
    // Récupération de la carte du Pokémon dans le DOM et affichage de celle-ci
    const pokemonCard = document.querySelector('.pokemon-card')
    pokemonCard.classList.remove('hidden')

    // Récupération des éléments dans le DOM et ajout des données du pokémon dans ceux-ci
    const pokemonName = document.querySelector('.pokemon-card-name')
    pokemonName.textContent = pokemonInfos[0]

    const pokemonImg = document.querySelector('.pokemon-card-img')
    pokemonImg.src = pokemonInfos[1]

    const pokemonTypes = document.querySelector('.pokemon-card-types')
    // Pour chaque type du Pokémon, création d'un élément li et ajout dans le DOM
    pokemonInfos[2].forEach(type => {
        const pokemonType = document.createElement('li')
        pokemonType.classList.add('pokemon-card-type')
        pokemonType.textContent = type
        pokemonTypes.appendChild(pokemonType)
    })

    // Pour chaque capacité du Pokémon, création d'un élément li et ajout dans le DOM
    const pokemonAbilities = document.querySelector('.pokemon-card-abilities')
    pokemonInfos[3].forEach(ability => {
        const pokemonAbility = document.createElement('li')
        pokemonAbility.classList.add('pokemon-ability')
        pokemonAbility.textContent = ability
        pokemonAbilities.appendChild(pokemonAbility)
    })

    // Pour chaque statistique du Pokémon, création d'un élément li et ajout dans le DOM
    const pokemonStats = document.querySelector('.pokemon-card-stats')
    pokemonInfos[4].forEach(stat => {
        const pokemonStat = document.createElement('li')
        pokemonStat.classList.add('pokemon-stat')
        pokemonStat.innerHTML = stat
        pokemonStats.appendChild(pokemonStat)
    })

    // Pour chaque évolution du Pokémon, création d'un élément li et ajout dans le DOM
    const pokemonEvolutions = document.querySelector('.pokemon-card-evolutions')
    pokemonInfos[5].forEach(evolution => {
        const pokemonEvolution = document.createElement('li')
        pokemonEvolution.classList.add('pokemon-evolution')
        pokemonEvolution.innerHTML = `<a href="/product.html?pokemon=${evolution.name}">${evolution.name}</a>
        <img class="evolution-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution.id}.png" alt="${evolution.name}" />`
        pokemonEvolutions.appendChild(pokemonEvolution)
    })

    // Récupération du prix du Pokémon dans le DOM et ajout de celui-ci
    const pokemonPrice = document.querySelector('.pokemon-card-price')
    pokemonPrice.textContent = pokemonInfos[6] + ' $'
}

// Appel de la fonction pour récupérer les données du Pokémon recherché
recupPokemon()

// Si le panier contient déjà le Pokémon, on désactive le bouton 'Add to cart'
if(shoppingCart.includes(pokemon)) {
    document.querySelector('.add-cart').setAttribute('disabled', 'disabled')
}