import { test, expect, describe } from '@jest/globals';
import { buildMakePerson } from '../../src/js-foundation/05-factory';

const getId = () => '1234';
const getAge = () => 35;

describe('js-foundation/05-factory', () => {
    test('buildMakePerson should return a function', () => {
        const makePerson = buildMakePerson({ getId, getAge });

        expect(typeof makePerson).toBe('function');
    });

    test('makePerson should return a person', () => {
        const makePerson = buildMakePerson({ getId, getAge });
        const name = 'Mario';
        const birthdate = '1983-05-07';
        const person = makePerson({ name, birthdate });

        expect(person).toEqual({
            id: getId(),
            name,
            birthdate,
            age: getAge()
        }); 
    });
});