import { test, expect, describe } from '@jest/globals';
import { getPokemonById } from '../../src/js-foundation/06-promises';

describe('js-foundation/06-promises', () => {
    test('should return a pokemon', async () => {
        const pokemon = await getPokemonById(1);
        
        expect(pokemon).toBe('bulbasaur');
    });

    test('should return an error if pokemon does not exist', async () => {
        try {
            await getPokemonById(100000);
            expect(true).toBeFalsy();
        } catch (error) {
            expect(error).toEqual(new Error('No pokemon'));
        }
    });
});