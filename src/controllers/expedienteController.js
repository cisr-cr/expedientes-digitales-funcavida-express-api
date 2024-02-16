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
