//Get GCLOUD Bucket
const { storage } = require("./../config/firebase");
const {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} = require("firebase/storage");

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

    // Recursive function to traverse the updatedData object and construct $set object
    const constructSetObject = (obj, path = "") => {
      const $set = {};
      for (const key in obj) {
        if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
          const nestedSet = constructSetObject(obj[key], `${path}${key}.`);
          Object.assign($set, nestedSet);
        } else {
          $set[`${path}${key}`] = obj[key];
        }
      }
      return $set;
    };

    // Construct $set object recursively
    const $set = constructSetObject(updatedData);

    // Use the provided ID to update the specific expediente
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set }
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

async function updateFotoExpedienteById(id, file) {
  try {
    const metadata = {
      contentType: file.mimetype,
    };

    const storageRef = ref(storage, id);
    const uploadTask = await uploadBytesResumable(
      storageRef,
      file.buffer,
      metadata
    );

    const downloadURL = await getDownloadURL(uploadTask.ref);

    const updatedData = { InformacionPaciente: { Foto: downloadURL } };
    return updateExpedienteById(id, updatedData);
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}

async function deleteExpedienteById(id) {
  try {
    const db = require("../config/db").getDB(); // Get the database dynamically
    const collection = db.collection("expedientes");
    // Use the provided ID to delete the specific expediente
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result;
  } catch (error) {
    console.error("Error deleting data from MongoDB:", error);
    throw error;
  }
}

module.exports = {
  fetchExpedienteById,
  updateExpedienteById,
  deleteExpedienteById,
  updateFotoExpedienteById,
};
