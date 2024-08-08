const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// static files access
app.use(express.static(path.join(__dirname, "../client/build")));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
})

// Routes
app.use("/api/v1/portfolio", require("./routes/portfolioRoute"));

// Port
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
