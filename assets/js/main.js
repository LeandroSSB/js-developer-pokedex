import { pokeApi } from "./poke-api.js"
import Pokemon from "./pokemon-model.js"
import * as utils from "./../utils/index.js"

const pokemonMain = document.getElementById('pokemon')
function convertPokemonToLi(pokemon = new Pokemon()) {
  const pokemonStyle = (type) =>  utils.colors[Object.keys(utils.colors).find(color => color==type)]['background-color']

    return `
    <section class="pokemon__mainDetails" style="background-color:${pokemonStyle(pokemon.type)}"> 
      <h1> ${pokemon.name} </h1>

      <span class="pokemon__mainDetails__number"> #${pokemon.number} </span>

      <div class="pokemon__mainDetails__types">
        ${pokemon.types.map(type => `<span class="pokemon__mainDetails__type" style="background-color:${pokemonStyle(type)}"> ${type} </span>`).join("")}
      </div>

      <img src="${pokemon.photo}" alt="${pokemon.name}">

    </section>

    <section class="pokemon__detail">
      <h1> About </h1>
      ${pokemon.stats.map(stat => `<div class="pokemon__pokemonDetail__pokemonStats"> <strong> ${stat.name} </strong> ${stat.base_stat} </div>`).join('')}
      <div class="pokemon__pokemonDetail__pokemonAbilities"> <strong> Abilities </strong>  ${pokemon.abilities.map(ability => ability).join(", ")} </div>
    </section>



    `
}

const loadPokemonItens = async (offset, limit) => {
    await pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = convertPokemonToLi(pokemons[0])
        pokemonMain.innerHTML = newHtml
      })
      
     
}

loadPokemonItens()
