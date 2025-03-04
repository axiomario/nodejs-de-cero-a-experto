import mongoose from "mongoose";

interface ConnectionOptions {
    mongoUrl: string;
    dbName: string;
}

export class MongoDatabase {
    public static async connect({ mongoUrl, dbName }: ConnectionOptions): Promise<void> {
        try {
            await mongoose.connect(mongoUrl, { dbName });
            console.log('Mongo connected');
        } catch (error) {
            console.log('Mongo connection error');
            throw error;
        }
    }
}