const ExpedienteModel = require("../models/expedienteModel");

exports.getEndpoint = async (req, res) => {
  try {
    const { id } = req.params;

    // Use the extracted ID to fetch the specific expediente
    const data = await ExpedienteModel.fetchExpedienteById(id);

    if (!data) {
      return res.status(404).json({ message: "Expediente not found" });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.postEndpoint = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Use the extracted ID and updated data to update the expediente
    const updatedExpediente = await ExpedienteModel.updateExpedienteById(
      id,
      updatedData
    );

    res.json(updatedExpediente);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Use Multer middleware to handle file upload
exports.postFotoEndpoint = async (req, res) => {
  try {
    const { id } = req.params;
    const file = req.file; // Assuming multer middleware is used to handle file upload

    // Check if file is present in the request
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Use the extracted ID and file data to update the expediente's photo
    const result = await ExpedienteModel.updateFotoExpedienteById(id, file);

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteEndpoint = async (req, res) => {
  try {
    const { id } = req.params;

    // Use the extracted ID to delete the specific expediente
    const result = await ExpedienteModel.deleteExpedienteById(id);

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Expediente not found" });
    }

    res.json({ message: "Expediente deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
