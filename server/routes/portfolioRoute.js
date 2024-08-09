const express = require('express');
const { createUserController } = require('../controllers/portfolioController');

// Create router object
const router = express.Router();

// Define the route
router.post('/createUser', createUserController);

// Export the router
module.exports = router;
