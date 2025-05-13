export interface CreateTableUseCase {
    execute: (options: Options) => string;
}

export interface Options {
    base: number;
    limit?: number;
}

export class CreateTable implements CreateTableUseCase {
    constructor() {}

    execute({ base, limit = 10 }: Options): string {
        const separator = '=========================';
        let text: string = `${ separator }\nMultiplication table (${ base })\n${ separator }\n`;

        for (let i = 1; i <= limit; i++) {
            text += `\n${ base } x ${ i } = ${ base * i }`;
        }

        return text;
    }
}