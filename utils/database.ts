import { MongoClient, Db } from 'mongodb';
import Bun from 'bun';
// Connect to MongoDB

let db: Db;

export async function mongoConnect() {
  try {
    const url = Bun.env.MONGO_CONNECTION_STRING;
    const dbName = Bun.env.MONGO_DB_NAME;
    if (url) {
      const client = new MongoClient(url);
      await client.connect();
      console.log('✅ Connected to MongoDB');
      db = client.db(dbName);
      const products = db.collection('products');
      return client;
    } else {
      console.error('❌ MongoDB connection string not found');
    }
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
}

export function getDb() {
  if (db) {
    return db;
  }
  throw 'No database found!';
}
