const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });


// Create Express app
const app = express();

// Middlewares
app.use(cors());

// Enable CORS to allow requests from different domains or ports
app.use(cors({
  origin: '*',  // Or specify your frontend's domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // If you are dealing with cookies or authentication tokens
}));

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
