import { test, expect, describe, jest } from '@jest/globals';
import { ServerApp } from './presentation/server-app';

describe('App', () => {
    test('should call Server.run with values', async () => {
        const serverRunMock = jest.fn();
        const base = 8;
        const limit = 20;
        const showTable = true;
        const fileName = 'tableTest';
        const fileDestination = 'output';
        
        ServerApp.run = serverRunMock;
        process.argv = [
            'node', 'app.ts',
            '--base', `${ base }`,
            '--limit', `${ limit }`,
            '--show', `${ showTable }`,
            '--name', `${ fileName }`,
            '--destination', `${ fileDestination }`
        ];

        await import('./app');

        expect(serverRunMock).toHaveBeenCalledWith({
            base, limit, showTable, fileName, fileDestination
        });
    });
});