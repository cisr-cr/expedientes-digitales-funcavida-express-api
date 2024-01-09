const ExpedientesModel = require("../models/expedientesModel");

// Expedientes controller functions
exports.getEndpoint = async (req, res) => {
  try {
    const data = await ExpedientesModel.fetchExpedientes();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.postEndpoint = async (req, res) => {
  try {
    const newData = req.body;
    const createdData = await ExpedientesModel.createExpediente(newData);
    res.status(201).json(createdData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
