const express = require("express");
const router = express.Router();
const expedientesController = require("../controllers/expedientesController");
const expedienteController = require("../controllers/expedienteController");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

// Define routes
router.get("/expedientes", expedientesController.getEndpoint);
router.post("/expedientes", expedientesController.postEndpoint);
router.get("/expediente/:id", expedienteController.getEndpoint);
router.post("/expediente/:id", expedienteController.postEndpoint);
router.post(
  "/expedientefoto/:id",
  upload.single("file"),
  expedienteController.postFotoEndpoint
);
router.delete("/expediente/:id", expedienteController.deleteEndpoint);
// router.post('/endpoint', yourController.postEndpoint);
// Add more routes as needed...

module.exports = router;
