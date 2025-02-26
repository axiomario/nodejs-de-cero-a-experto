import { test, expect, describe, beforeEach, jest } from '@jest/globals';

const runCommand = async (args: string[]) => {
    process.argv = [...process.argv, ...args];

    const argsPlugin = await import('./args.plugin');

    return argsPlugin.args;
};

describe('Args plugin', () => {
    const originalArgv = process.argv;

    beforeEach(() => {
        process.argv = originalArgv;
        jest.resetModules();
    });

    test('should return default values', async () => {
        const base = 8;
        const args = await runCommand(['--base', `${ base }`]);
        
        expect(args).toEqual(expect.objectContaining({
            base,
            limit: 10,
            show: false,
            name: 'table',
            destination: 'outputs'
        }));
    });

    test('should return configuration with custom values', async () => {
        const base = 8;
        const limit = 20;
        const show = true;
        const name = 'tableTest';
        const destination = 'output';
        const args = await runCommand([
            '--base', `${ base }`,
            '--limit', `${ limit }`,
            '--show', `${ show }`,
            '--name', `${ name }`,
            '--destination', `${ destination }`,
        ]);

        expect(args).toEqual(expect.objectContaining({
            base,
            limit,
            show,
            name,
            destination
        }));
    });
});