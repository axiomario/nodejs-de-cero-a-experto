const { httpClient } = require('../plugins');

const getPokemonById = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${ id }`;
    const pokemon = await httpClient.get(url);

    if (!pokemon) {
        throw new Error('No pokemon');
    }

    return pokemon.name;
    
    /*return fetch(url)
        .then(response => response.json())
        .then(pokemon => pokemon.name);*/
};

module.exports = getPokemonById;