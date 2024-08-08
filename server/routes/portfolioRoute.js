const express = require("express");
const { sendEmailController } = require("../controllers/portfolioContoller");

// Create router object
const router = express.Router();

// Define the route
router.post("/sendEmail", sendEmailController);

// Export the router
module.exports = router;
