import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SaveFile } from '../domain/use-cases/save-file.use-case';

interface RunOptions {
    base: number;
    limit: number;
    showTable: boolean;
    fileName: string;
    fileDestination: string;
}

export class ServerApp {
    public static run({ base, limit, showTable, fileName, fileDestination }: RunOptions) {
        console.log('Server running...');
        const fileContent = new CreateTable().execute({ base, limit });
        const created = new SaveFile().execute({ fileContent, fileName, fileDestination });

        if (showTable) {
            console.log(fileContent);
        }
    }
}