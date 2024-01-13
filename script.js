const searchPokemon = () => {
    const searchInput = document.getElementById('pokemon-value')
    const pokemon = searchInput.value.toLowerCase()
    returnPokemon(pokemon)
}

const returnPokemon = (pokemon) => {
    window.location.href = "/product.html?pokemon=" + pokemon
}

const searchBtn = document.getElementById('search-btn')
searchBtn.addEventListener('click', searchPokemon)




const displayPokemonsList = () => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')
        .then(response => response.json())
        .then(data => {
            const pokemons = data.results
            for (let i = 0; i < 20; i++) {
                const randomPokemon = Math.floor(Math.random() * pokemons.length)
                pokemons.splice(randomPokemon, 1)
                fetch(pokemons[randomPokemon].url)
                    .then(response => response.json())
                    .then(data => {
                        const pokemonName = data.name
                        const pokemonImg = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + data.id + ".png"
                        const pokemonTypes = data.types.map(type => type.type.name)
                        data.price = Math.floor(Math.random() * 1000) + 1

                        const pokemonInfos = [pokemonName, pokemonImg, pokemonTypes, data.price]
                        displayPokemonCard(pokemonInfos)
                    })
            }
        })
}


const displayPokemonCard = (pokemonInfos) => {
    const pokemonsList = document.querySelector('.summary-pokemon-list')
    const pokemonItem = document.createElement('li')
    pokemonItem.classList.add('summary-pokemon-item')
    pokemonsList.appendChild(pokemonItem)

    const pokemonCard = document.createElement('div')
    pokemonCard.classList.add('summary-pokemon-card')
    pokemonItem.appendChild(pokemonCard)
    pokemonCard.addEventListener('click', () => {
        window.location.href = "/product.html?pokemon=" + pokemonInfos[0]
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


displayPokemonsList()











const fetchTypes = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/type')
    const data = await response.json()
    return data.results.map(type => type.name)
}

const displayTypes = (types) => {
    const filtersTypesList = document.querySelector('.filters-types-list')
    types.forEach(type => {
        const typeItem = document.createElement('li')
        typeItem.classList.add('filter-type-item')
        filtersTypesList.appendChild(typeItem)

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

const displayTypesFilters = async () => {
    const types = await fetchTypes()
    displayTypes(types)
}


// Fonction pour filtrer les pokemons afficher grâce à displayPokemonsList() en fonction de leur type
const filterPokemonsByTypes = () => {
    const filterTypeCheckbox = document.querySelectorAll('.filter-type-checkbox')
    const filterTypeCheckboxChecked = document.querySelectorAll('.filter-type-checkbox:checked')
    const filterTypeCheckboxCheckedValues = [...filterTypeCheckboxChecked].map(checkbox => checkbox.name)

    const summaryPokemonItems = document.querySelectorAll('.summary-pokemon-item')
    summaryPokemonItems.forEach(pokemonItem => {
        const pokemonTypes = pokemonItem.querySelector('.summary-pokemon-types').textContent.split(', ')
        const pokemonTypesFiltered = pokemonTypes.filter(type => filterTypeCheckboxCheckedValues.includes(type))
        if (pokemonTypesFiltered.length === 0) {
            pokemonItem.style.display = 'none'
        }
        else {
            pokemonItem.style.display = 'block'
        }

        if(filterTypeCheckboxChecked.length === 0) {
            pokemonItem.style.display = 'block'
        }
    })
}


displayTypesFilters()
.then(() => {
    const filterTypeCheckbox = document.querySelectorAll('.filter-type-checkbox')
    filterTypeCheckbox.forEach(checkbox => {
        checkbox.addEventListener('change', filterPokemonsByTypes)
    })
})