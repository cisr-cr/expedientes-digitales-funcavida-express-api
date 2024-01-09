// Function to fetch expedientes from MongoDB
async function fetchExpedientes() {
  try {
    const db = require("../config/db").getDB(); // Get the database dynamically
    const collection = db.collection("expedientes");
    const data = await collection.find().toArray();
    return data;
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    throw error;
  }
}

// Function to create expediente in MongoDB
async function createExpediente(newExpediente) {
  console.log(newExpediente);
  try {
    const db = require("../config/db").getDB();
    const collection = db.collection("expedientes");
    const result = await collection.insertOne(newExpediente);
    return result;
  } catch (error) {
    console.error("Error creating data in MongoDB:", error);
    throw error;
  }
}

module.exports = {
  fetchExpedientes,
  createExpediente,
};
