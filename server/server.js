const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((error) => {
  console.error('Error connecting to MongoDB Atlas:', error);
});

// Create Express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Static files access
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Routes
app.use('/api/v1/portfolio', require('./routes/portfolioRoute'));

// Port
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
