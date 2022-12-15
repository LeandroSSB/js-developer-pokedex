import { pokeApi } from "./poke-api.js"
import Pokemon from "./pokemon-model.js"

const pokemonMain = document.getElementById('pokemon')
function convertPokemonToLi(pokemon = new Pokemon()) {
  
    return `
    <section class="pokemon__mainDetails"> 
      <h1> ${pokemon.name} </h1>

      <span> #${pokemon.number} </span>

      ${pokemon.types.map(type => `<span class="pokemon__mainDetails__types"> ${type} </span>`).join("")}

      <img src="${pokemon.photo}" alt="${pokemon.name}" width="250px">

    </section>

    <section class="pokemon__detail">
      <h1> About </h1>
      ${pokemon.stats.map(stat => `<div class="pokemon__pokemonDetail__pokemonStats"> <strong> ${stat.name} </strong> ${stat.base_stat} </div>`).join('')}
      <div class="pokemon__pokemonDetail__pokemonAbilities"> <strong> Abilities </strong>  ${pokemon.abilities.map(ability => ability).join(", ")} </div>
    </section>



    `
}

const loadPokemonItens = (offset, limit) => {
    pokeApi.getPokemons(offset, limit).then( (pokemons = []) => {
        const newHtml = convertPokemonToLi(pokemons[0])
        pokemonMain.innerHTML = newHtml
    })
}

loadPokemonItens()
