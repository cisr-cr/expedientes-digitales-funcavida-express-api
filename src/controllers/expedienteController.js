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
