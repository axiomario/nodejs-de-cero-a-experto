import { httpClient } from '../plugins';

export const getPokemonById = async (id: number): Promise<string> => {
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