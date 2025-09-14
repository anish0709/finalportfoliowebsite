const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/portfolio", require("./routes/portfolioRoute"));

// Port
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
