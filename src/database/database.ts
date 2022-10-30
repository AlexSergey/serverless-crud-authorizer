import { connect, Mongoose } from 'mongoose';

export interface IDatabase {
  connect: () => Promise<Mongoose>;
  close: () => Promise<void>;
}

let db: Mongoose | undefined;

export const useDatabase = (connectionString: string): IDatabase => ({
  close: async (): Promise<void> => {
    await db?.connection?.close();
    db = undefined;
  },

  connect: async (): Promise<Mongoose> => {
    if (db) {
      return db;
    }

    db = await connect(connectionString);

    return db;
  },
});
