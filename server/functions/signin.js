import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017";
const dbName = "POS_Database";

async function signIn(email, password) {
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
    const user = await db.collection("users").findOne({ email, password });
    client.close();
    return user;
  }

  export default signIn