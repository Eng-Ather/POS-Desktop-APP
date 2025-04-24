import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://localhost:27017');
await client.connect();

export const db = client.db('POS');
export const usersCollection = db.collection('users');
