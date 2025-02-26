import { test, expect, describe, afterEach, jest, beforeEach } from '@jest/globals';
import fs from 'fs';
import { ServerApp } from './server-app';
import { CreateTable, Options as CreateTableOptions } from '../domain/use-cases/create-table.use-case';
import { SaveFile, Options as SaveFileOptions } from '../domain/use-cases/save-file.use-case';


describe('Server App', () => {
    const base = 8;
    const limit = 20;
    const showTable = true;
    const fileDestination = 'output';
    const fileName = 'tableTest';
    const options = {
        base,
        limit,
        showTable,
        fileName,
        fileDestination,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        try {
            fs.rmSync(fileDestination, { recursive: true });
        } catch(error) {}
    });

    test('should run ServerApp with options', () => {
        const logSpy = jest.spyOn(console, 'log');
        const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
        const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');

        ServerApp.run(options);

        expect(logSpy).toHaveBeenCalledWith('Server running...');
        expect(createTableSpy).toHaveBeenCalledWith({ base, limit });
        expect(saveFileSpy).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            fileDestination,
            fileName
        });
    });

    test('should run with mocked values', () => {
        const logMock = jest.fn();
        const createMock = jest.fn<(options: CreateTableOptions) => string>().mockReturnValue('');
        const saveFileMock = jest.fn<(options: SaveFileOptions) => boolean>().mockReturnValue(true);

        global.console.log = logMock;
        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveFileMock;
        ServerApp.run(options);

        expect(logMock).toHaveBeenCalledWith('Server running...');
        expect(createMock).toHaveBeenCalledWith({ base, limit });
        expect(saveFileMock).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            fileDestination,
            fileName
        });
    });
});