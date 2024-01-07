// Example controller functions
exports.getEndpoint = async (req, res) => {
  try {
    res.json({ id: 1 });
  } catch (err) {
    res.status(500).json({ message: "Error!" });
  }
};
