// Fonction pour rechercher un Pokémon
const searchPokemon = () => {
    // Récupération de la valeur de l'input de recherche
    const searchInput = document.getElementById('pokemon-value')
    const pokemon = searchInput.value.toLowerCase()
    // Appel de la fonction pour rediriger vers la page du Pokémon recherché
    returnPokemon(pokemon)
}

// Fonction pour rediriger vers la page du Pokémon recherché
const returnPokemon = (pokemon) => {
    window.location.href = "/product.html?pokemon=" + pokemon
}

// Récupération du bouton de recherche dans le DOM
const searchBtn = document.getElementById('search-btn')
// Ecoute de l'événement click sur le bouton de recherche
searchBtn.addEventListener('click', searchPokemon)



// Fonction pour afficher la liste des pokémons sur la page d'accueil
const displayPokemonsList = () => {
    // Récupération de la liste des pokémons via un fetch de l'API
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')
        // Récupération des données au format JSON
        .then(response => response.json())
        .then(data => {
            // Initialisation du tableau qui contient les pokémons
            const pokemons = data.results
            // Boucle pour afficher 20 pokémons aléatoirement
            for (let i = 0; i < 20; i++) {
                // Récupération d'un nombre aléatoire entre 0 et le nombre de pokémons restants
                const randomPokemon = Math.floor(Math.random() * pokemons.length)
                // Suppression du pokémon sélectionné du tableau
                pokemons.splice(randomPokemon, 1)
                // Récupération des données du pokémon sélectionné via un fetch de l'API
                fetch(pokemons[randomPokemon].url)
                    // Récupération des données au format JSON
                    .then(response => response.json())
                    .then(data => {
                        // Récupération des données du pokémon
                        const pokemonName = data.name
                        const pokemonImg = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + data.id + ".png"
                        const pokemonTypes = data.types.map(type => type.type.name)
                        // Création du prix du pokémon
                        data.price = Math.floor(Math.random() * 1000) + 1

                        // Création d'un tableau qui contient les données du pokémon
                        const pokemonInfos = [pokemonName, pokemonImg, pokemonTypes, data.price]
                        // Appel de la fonction pour afficher le pokémon
                        displayPokemonCard(pokemonInfos)
                    })
            }
        })
}

// Fonction pour afficher un pokémon
const displayPokemonCard = (pokemonInfos) => {
    // Récupération de la liste des pokémons dans le DOM
    const pokemonsList = document.querySelector('.summary-pokemon-list')
    // Création de l'élément qui contient le pokémon et ajout dans le DOM
    const pokemonItem = document.createElement('li')
    pokemonItem.classList.add('summary-pokemon-item')
    pokemonsList.appendChild(pokemonItem)

    // Création de la carte du pokémon et de éléments qu'elle contient et ajout dans le DOM
    const pokemonCard = document.createElement('div')
    pokemonCard.classList.add('summary-pokemon-card')
    pokemonItem.appendChild(pokemonCard)
    pokemonCard.addEventListener('click', () => {
        returnPokemon(pokemonInfos[0])
    })

    const pokemonImg = document.createElement('img')
    pokemonImg.classList.add('summary-pokemon-img')
    pokemonImg.src = pokemonInfos[1]
    pokemonCard.appendChild(pokemonImg)

    const pokemonName = document.createElement('h3')
    pokemonName.classList.add('summary-pokemon-name')
    pokemonName.textContent = pokemonInfos[0]
    pokemonCard.appendChild(pokemonName)

    const pokemonTypesTitle = document.createElement('span')
    pokemonTypesTitle.classList.add('summary-pokemon-types-title')
    pokemonTypesTitle.textContent = 'Types :'
    pokemonCard.appendChild(pokemonTypesTitle)

    const pokemonTypes = document.createElement('div')
    pokemonTypes.classList.add('summary-pokemon-types')
    pokemonTypes.textContent = pokemonInfos[2].map(type => type).join(', ')
    pokemonCard.appendChild(pokemonTypes)

    const pokemonPrice = document.createElement('span')
    pokemonPrice.classList.add('summary-pokemon-price')
    pokemonPrice.textContent = pokemonInfos[3] + ' $'
    pokemonCard.appendChild(pokemonPrice)

    const pokemonAddToCardBtn = document.createElement('button')
    pokemonAddToCardBtn.classList.add('add-cart')
    pokemonAddToCardBtn.textContent = 'Add to cart'
    pokemonItem.appendChild(pokemonAddToCardBtn)
    pokemonAddToCardBtn.addEventListener('click', () => {
        addToCart(pokemonInfos[0])
    })
}

// Appel de la fonction pour afficher la liste des pokémons
displayPokemonsList()










// Fonction asynchrone pour récupérer les types de pokémon existants via un fetch de l'API
const fetchTypes = async () => {
    // Récupération des données au format JSON
    const response = await fetch('https://pokeapi.co/api/v2/type')
    const data = await response.json()
    // Retourner les types de pokémon
    return data.results.map(type => type.name)
}

// Fonction pour afficher les types de pokémon
const displayTypes = (types) => {
    // Récupération de la liste des types dans le DOM
    const filtersTypesList = document.querySelector('.filters-types-list')
    // Boucle pour afficher les types de pokémon
    types.forEach(type => {
        // Création de l'élément qui contient le type et ajout dans le DOM
        const typeItem = document.createElement('li')
        typeItem.classList.add('filter-type-item')
        filtersTypesList.appendChild(typeItem)

        // Création de la checkbox et du label du type et ajout dans le DOM
        const typeCheckbox = document.createElement('input')
        typeCheckbox.classList.add('filter-type-checkbox')
        typeCheckbox.type = 'checkbox'
        typeCheckbox.name = type
        typeItem.appendChild(typeCheckbox)
        
        const typeLabel = document.createElement('label')
        typeLabel.classList.add('filter-type-label')
        typeLabel.textContent = type
        typeItem.appendChild(typeLabel)
    })
}

// Fonction asynchrone pour afficher les types de pokémon
const displayTypesFilters = async () => {
    // Récupération des types de pokémon
    const types = await fetchTypes()
    // Appel de la fonction pour afficher les types de pokémon
    displayTypes(types)
}


// Fonction pour ffiltrer les pokémons par type
const filterPokemonsByTypes = () => {
    // Récupération des types de pokémon cochés
    const filterTypeCheckboxChecked = document.querySelectorAll('.filter-type-checkbox:checked')
    // Récupération des valeurs des types de pokémon cochés dans une copie du tableau filterTypeCheckboxChecked
    const filterTypeCheckboxCheckedValues = [...filterTypeCheckboxChecked].map(checkbox => checkbox.name)

    // Récupération des éléments qui contiennent les pokémons dans le DOM
    const summaryPokemonItems = document.querySelectorAll('.summary-pokemon-item')
    // Boucle pour afficher les pokémons
    summaryPokemonItems.forEach(pokemonItem => {
        // Récupération des types du pokémon
        const pokemonTypes = pokemonItem.querySelector('.summary-pokemon-types').textContent.split(', ')
        // Filtrage par les types cochés correspondants aux types du pokémon
        const pokemonTypesFiltered = pokemonTypes.filter(type => filterTypeCheckboxCheckedValues.includes(type))
        // Si le pokémon ne correspond pas aux types cochés, cache
        if (pokemonTypesFiltered.length === 0) {
            pokemonItem.style.display = 'none'
        }
        // Sinon, affichage
        else {
            pokemonItem.style.display = 'block'
        }

        // Si aucun type n'est cochés, affichage de tous les pokémons
        if(filterTypeCheckboxChecked.length === 0) {
            pokemonItem.style.display = 'block'
        }
    })
}

// Appel de la fonction pour afficher les types de pokémon
displayTypesFilters()
// Ecoute de l'événement change sur les checkbox des types de pokémon
.then(() => {
    const filterTypeCheckbox = document.querySelectorAll('.filter-type-checkbox')
    filterTypeCheckbox.forEach(checkbox => {
        checkbox.addEventListener('change', filterPokemonsByTypes)
    })
})