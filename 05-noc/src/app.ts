import { PrismaClient } from '@prisma/client';
import { envs } from './config/plugins/envs.plugin';
import { MongoDatabase } from './data/mongo';
import { Server } from "./presentation/server";

(async () => {
    main();
})();

async function main(): Promise<void> {
    const prisma = new PrismaClient();

    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    });
    
    Server.start();
    console.log(envs);
}