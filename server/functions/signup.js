import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017";
const dbName = "POS";

function signUp(email, password) {
  const client = new MongoClient(url);
  client.connect();
  const db = client.db(dbName);
  db.collection("users").insertOne({ email, password });
  client.close();
}

export default signUp;
