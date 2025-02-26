import { args } from './config/plugins/args.plugin';
import { ServerApp } from './presentation/server-app';

(async () => {
    await main();
})();

async function main() {
    const { base, limit, show: showTable, name: fileName, destination: fileDestination } = args;

    ServerApp.run({ base, limit, showTable, fileName, fileDestination });
}