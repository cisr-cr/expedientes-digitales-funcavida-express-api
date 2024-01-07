const express = require("express");
const router = express.Router();
const expedientesController = require("../controllers/expedientesController");

// Define routes
router.get("/expedientes", expedientesController.getEndpoint);
// router.post('/endpoint', yourController.postEndpoint);
// Add more routes as needed...

module.exports = router;
