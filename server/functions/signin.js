import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017";
const dbName = "POS";

function signIn(email, password) {
  const client = new MongoClient(url);
  client.connect();
  const db = client.db(dbName);
  const user = db.collection("users").findOne({ email, password });
  client.close();
  alert("Signin Successful")
  return user;
}

export default signIn;
