import { test, expect, describe } from '@jest/globals';
import { env } from '../../src/js-foundation/02-destructuring';

describe('js-foundation/02-destructuring', () => {
    test('env should be defined', () => {
        expect(env).toBeDefined();
    });
});