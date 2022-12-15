import Pokemon from "./pokemon-model.js"

export const pokeApi = {
  async getPokemonDetail (pokemon)  {
      const response = await fetch(pokemon.url)
      const pokeDetail = await response.json()
      return convertPokeApiDetailToPokemon(pokeDetail)
  },
  
  async getPokemons() {
    const random = Math.floor(Math.random() * 152)
      const url = `https://pokeapi.co/api/v2/pokemon?offset=${random}`


      return await fetch(url)
          .then((response) => response.json())
          .then((jsonBody) => jsonBody.results)
          .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
          .then((detailRequests) => Promise.all(detailRequests))
          .then((pokemonsDetails) => pokemonsDetails)
  }
  
}

export const convertPokeApiDetailToPokemon = (pokeDetail) => {
  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
  const [ type ] = types

  const abilities = pokeDetail.abilities.map(abilitySlot => abilitySlot.ability.name)

  const stats = pokeDetail.stats.map(statsSlot => { 
    return {
      name : statsSlot.stat.name,
      base_stat: statsSlot.base_stat
    }
  })

    const pokemon = new Pokemon({
      name: pokeDetail.name,
      number: pokeDetail.id,
      photo: pokeDetail.sprites.other.dream_world.front_default,
      type: type,
      types: types,
      abilities: abilities,
      base_experience: pokeDetail.base_experience,
      height: pokeDetail.height,
      weight: pokeDetail.weight,
      stats: stats
    })
  
    return pokemon
}

