const mongoose = require('mongoose');
require('dotenv-safe').config();


export class DBCreator {
    private static _instance: DBCreator;

    private constructor() {}
    

    static async getInstance(): Promise<DBCreator | null> {
        if (!DBCreator._instance) {
            DBCreator._instance = new DBCreator();

            const connect = await mongoose.connect(process.env.MONGO_URL);
            if (!connect) {
                return;
            }
        }

        return DBCreator._instance;
    }
}
