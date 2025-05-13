import { test, expect, describe } from '@jest/globals';
import { getUserById } from '../../src/js-foundation/03-callbacks';

describe('js-foundation/03-callbacks', () => {
    test('should return an error if user does not exist', (done) => {
        const id = 10;

        getUserById(id, (error, user) => {
            expect(error).toBeDefined();
            expect(user).toBeUndefined();
            done();
        });
    });

    test('should return the user John Doe', (done) => {
        const id = 1;

        getUserById(id, (error, user) => {
            expect(error).toBeUndefined();
            expect(user).toEqual({
                id: 1,
                name: 'John Doe',
            });
            done();
        });
    });
});
getUserById