import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017";
const dbName = "POS";

async function signUp(email, password) {
  const client = new MongoClient(url);
  await client.connect();
  const db = client.db(dbName);
  await db.collection("users").insertOne({ email, password });
  client.close();
}


export default signUp
