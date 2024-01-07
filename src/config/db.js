const { MongoClient } = require("mongodb");
require("dotenv").config();

let _db;
const url = process.env.MONGO_DB_URI;
const dbName = process.env.MONGO_DB_NAME;

const connectDB = async () => {
  try {
    const client = new MongoClient(url);
    await client.connect();
    console.log("Connected to MongoDB");
    _db = client.db(dbName);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

const getDB = () => {
  if (_db) {
    return _db;
  } else {
    throw new Error("MongoDB not connected!");
  }
};

module.exports = {
  connectDB,
  getDB,
};
