// Function to fetch expediente from MongoDB by ID
const { ObjectId } = require("mongodb");

async function fetchExpedienteById(id) {
  try {
    const db = require("../config/db").getDB(); // Get the database dynamically
    const collection = db.collection("expedientes");

    // Use the provided ID to fetch the specific expediente
    const data = await collection.findOne({ _id: new ObjectId(id) });

    return data;
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    throw error;
  }
}

module.exports = {
  fetchExpedienteById,
};
