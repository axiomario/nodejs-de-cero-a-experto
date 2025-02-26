import { test, expect, describe } from '@jest/globals';
import { CreateTable } from './create-table.use-case';

describe('CreateTableUseCase', () => {
    test('should create table', () => {
        const base = 5;
        const limit = 20;
        const createTable = new CreateTable();
        const table = createTable.execute({ base, limit });

        expect(table).toContain(`${ base } x 1 = ${ base }`);
        expect(table).toContain(`${ base } x ${ limit } = ${ base * limit }`);
    });
});