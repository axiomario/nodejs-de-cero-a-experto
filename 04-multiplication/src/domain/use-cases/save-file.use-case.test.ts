import fs from 'fs';
import { test, expect, describe, afterEach, jest } from '@jest/globals';
import { SaveFile } from './save-file.use-case';

const fileDestination = 'outputs';

describe('SaveFileUseCase', () => {
    afterEach(() => {
        try {
            fs.rmSync(fileDestination, { recursive: true });
        } catch(error) {}
    });

    test('should create table file', () => {
        const saveFile = new SaveFile();
        const options = {
            fileContent: 'content',
            fileDestination,
            fileName: 'test'
        };
        const filePath = `${ options.fileDestination }/${ options.fileName }.txt`
        const result = saveFile.execute(options);
        const fileExists = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
        
        expect(result).toBeTruthy();
        expect(fileExists).toBeTruthy();
        expect(fileContent).toBe(options.fileContent);
    });

    test('should return false if directory could not be created', () => {
        const saveFile = new SaveFile();
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {
            throw new Error('mkdirSync error');
        });
        const result = saveFile.execute({ fileContent: 'content' });

        expect(result).toBeFalsy();

        mkdirSpy.mockRestore();
    });

    test('should return false if file could not be created', () => {
        const saveFile = new SaveFile();
        const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {
            throw new Error('writeFileSync error');
        });
        const result = saveFile.execute({ fileContent: 'content' });

        expect(result).toBeFalsy();

        writeFileSpy.mockRestore();
    });
});