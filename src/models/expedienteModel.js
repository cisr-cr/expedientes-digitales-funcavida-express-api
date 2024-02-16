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

async function updateExpedienteById(id, updatedData) {
  try {
    const db = require("../config/db").getDB(); // Get the database dynamically
    const collection = db.collection("expedientes");

    // Use the provided ID to update the specific expediente
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );

    if (result.modifiedCount === 0) {
      throw new Error("No document found or updated.");
    }

    // Fetch and return the updated expediente
    const updatedExpediente = await fetchExpedienteById(id);
    return updatedExpediente;
  } catch (error) {
    console.error("Error updating data in MongoDB:", error);
    throw error;
  }
}

module.exports = {
  fetchExpedienteById,
  updateExpedienteById,
};
