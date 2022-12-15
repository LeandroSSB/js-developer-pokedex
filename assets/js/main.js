import { pokeApi } from "./poke-api.js"
import Pokemon from "./pokemon-model.js"

const pokemonMain = document.getElementById('pokemon')
console.log(pokemonMain)
function convertPokemonToLi(pokemon = new Pokemon()) {
  
    return `
    <section class="pokemon__mainDetails"> 
      <h1> ${pokemon.name} </h1>

      <span> #${pokemon.number} </span>

      ${pokemon.types.map(type => `<span> ${type} </span>`)}

      <img src="${pokemon.photo}" alt="${pokemon.name}" width="150px">

    </section>

    <section>
      <div> ${pokemon} </div>
    </section>



    `
}

const loadPokemonItens = (offset, limit) => {
    pokeApi.getPokemons(offset, limit).then( (pokemons = []) => {
        // const newHtml = pokemons.map(convertPokemonToLi).join('')
        console.log(convertPokemonToLi(pokemons[0]))
        const newHtml = convertPokemonToLi(pokemons[0])
        pokemonMain.innerHTML = newHtml
    })
}

loadPokemonItens()
