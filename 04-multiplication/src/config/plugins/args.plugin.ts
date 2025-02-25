import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export const args = yargs(hideBin(process.argv))
    .option('base', {
        alias: 'b',
        type: 'number',
        demandOption: true,
        describe: 'Multiplication table base'
    })
    .option('limit', {
        alias: 'l',
        type: 'number',
        default: 10,
        describe: 'Multiplication table limit'
    })
    .option('show', {
        alias: 's',
        type: 'boolean',
        default: false,
        describe:'Show multiplication table'
    })
    .option('name', {
        alias: 'n',
        type: 'string',
        default: 'table',
        describe:'File name'
    })
    .option('destination', {
        alias: 'd',
        type: 'string',
        default: 'outputs',
        describe:'File destination'
    })
    .check((argv, options) => {
        if (argv.limit < 1) {
            throw new Error('Limit value nust be greater than 0');
        }

        return true;
    })
    .parseSync();