import { args } from './config/plugins/args.plugin';
import { ServerApp } from './presentation/server-app';

async function main() {
    const { base, limit, show: showTable, name: fileName, destination: fileDestination } = args;

    //createTable(base, limit, show);
    ServerApp.run({ base, limit, showTable, fileName, fileDestination });
}

(async () => {
    await main();
})();