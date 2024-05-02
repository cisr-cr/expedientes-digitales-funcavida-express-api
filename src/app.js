const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const { connectDB } = require("./config/db");
const apiRoutes = require("./routes/apiRoutes");

// Connect to MongoDB
connectDB()
  .then(() => {
    // Middleware setup
    app.use(express.json());
    //CORS
    app.use(
      cors({
        origin: "*",
        methods: ["GET", "POST"],
      })
    );

    // Mounting routes
    app.use("/api", apiRoutes);

    // Server setup
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
