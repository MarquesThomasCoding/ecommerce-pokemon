const queryString = window.location.search;

if (queryString === '') {
    window.location.href = '/index.html'
}

const urlParams = new URLSearchParams(queryString);
const pokemon = urlParams.get('pokemon')

const recupEvolution = (pokemon) => {
    return new Promise((resolve, reject) => {
        const pokemonEvolutions = []

        fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`)
        .then((response) => {
            const error = response.status

            if (error === 404) {
                // On affiche un message d'erreur sur la page
                const errorMessage = document.createElement('h2')
                errorMessage.classList.add('error-message')
                errorMessage.textContent = 'Pokemon not found'
                document.querySelector('.pokemon-card').style.display = 'none'
                document.body.appendChild(errorMessage)
            }
            return response.json()
        })
        .then((data) => {
            fetch(data.evolution_chain.url)
            .then((response) => {
                const error = response.status

                if (error === 404) {
                    // On affiche un message d'erreur sur la page
                    const errorMessage = document.createElement('h2')
                    errorMessage.classList.add('error-message')
                    errorMessage.textContent = 'Pokemon not found'
                    document.querySelector('.pokemon-card').style.display = 'none'
                    document.body.appendChild(errorMessage)
                }
                return response.json()
            })
            .then((data) => {
                const poke = {}
                poke.name = data.chain.species.name
                poke.id = data.chain.species.url.split('/')[6]
                pokemonEvolutions.push(poke)
                if (data.chain.evolves_to.length > 0) {
                    const poke = {}
                    poke.name = data.chain.evolves_to[0].species.name
                    poke.id = data.chain.evolves_to[0].species.url.split('/')[6]
                    pokemonEvolutions.push(poke)
                    if (data.chain.evolves_to[0].evolves_to.length > 0) {
                        const poke = {}
                        poke.name = data.chain.evolves_to[0].evolves_to[0].species.name
                        poke.id = data.chain.evolves_to[0].evolves_to[0].species.url.split('/')[6]
                        pokemonEvolutions.push(poke)
                    }
                }
                resolve(pokemonEvolutions);
            })
            .catch((error) => reject(error));
        })
        .catch((error) => reject(error));
    });
}



const recupPokemon = async () => {
    try {
        const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        const error = data.status

        if (error === 404) {
            // On affiche un message d'erreur sur la page
            const errorMessage = document.createElement('h2')
            errorMessage.classList.add('error-message')
            errorMessage.textContent = 'Pokemon not found'
            document.querySelector('.pokemon-card').style.display = 'none'
            document.body.appendChild(errorMessage)
        }
        else {
            const pokemonData = await data.json();

            const pokemonEvolutions = await recupEvolution(pokemon);
    
            const pokemonName = pokemonData.name
            const pokemonImg = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + pokemonData.id + ".png"
            const pokemonTypes = pokemonData.types.map(type => type.type.name)
            const pokemonAbilities = pokemonData.abilities.map(ability => ability.ability.name)
            const pokemonStats = pokemonData.stats.map(stat => stat.stat.name + ' : <b>' + stat.base_stat + '</b>')

            const pokemonPrice = Math.floor(Math.random() * 1000) + 1
    
            const pokemonInfos = [pokemonName, pokemonImg, pokemonTypes, pokemonAbilities, pokemonStats, pokemonEvolutions, pokemonPrice]
    
            displayPokemon(pokemonInfos)    
        }

    } catch (error) {
        console.error('Une erreur s\'est produite :', error);
    }
}


const displayPokemon = (pokemonInfos) => {
    const pokemonCard = document.querySelector('.pokemon-card')
    pokemonCard.classList.remove('hidden')
    const pokemonName = document.querySelector('.pokemon-card-name')
    pokemonName.textContent = pokemonInfos[0]

    const pokemonImg = document.querySelector('.pokemon-card-img')
    pokemonImg.src = pokemonInfos[1]

    const pokemonTypes = document.querySelector('.pokemon-card-types')
    pokemonInfos[2].forEach(type => {
        const pokemonType = document.createElement('li')
        pokemonType.classList.add('pokemon-card-type')
        pokemonType.textContent = type
        pokemonTypes.appendChild(pokemonType)
    })

    const pokemonAbilities = document.querySelector('.pokemon-card-abilities')
    pokemonInfos[3].forEach(ability => {
        const pokemonAbility = document.createElement('li')
        pokemonAbility.classList.add('pokemon-ability')
        pokemonAbility.textContent = ability
        pokemonAbilities.appendChild(pokemonAbility)
    })

    const pokemonStats = document.querySelector('.pokemon-card-stats')
    pokemonInfos[4].forEach(stat => {
        const pokemonStat = document.createElement('li')
        pokemonStat.classList.add('pokemon-stat')
        pokemonStat.innerHTML = stat
        pokemonStats.appendChild(pokemonStat)
    })

    const pokemonEvolutions = document.querySelector('.pokemon-card-evolutions')
    pokemonInfos[5].forEach(evolution => {
        const pokemonEvolution = document.createElement('li')
        pokemonEvolution.classList.add('pokemon-evolution')
        pokemonEvolution.innerHTML = `<a href="/product.html?pokemon=${evolution.name}">${evolution.name}</a>
        <img class="evolution-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution.id}.png" alt="${evolution.name}" />`
        pokemonEvolutions.appendChild(pokemonEvolution)
    })

    const pokemonPrice = document.querySelector('.pokemon-card-price')
    pokemonPrice.textContent = pokemonInfos[6] + ' $'
}

recupPokemon()

if(shoppingCart.includes(pokemon)) {
    document.querySelector('.add-cart').setAttribute('disabled', 'disabled')
}