const mongoose = require('mongoose');

// Define schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  msg: { type: String, required: true },
});

// Create model
const User = mongoose.model('User', userSchema);



const createUserController = async (req, res) => {
  try {
    const { name, email, msg } = req.body;

    if (!name || !email || !msg) {
      return res.status(400).send({
        success: false,
        message: 'Please provide all fields',
      });
    }

    const newUser = new User({ name, email, msg });
    await newUser.save();

    return res.status(201).send({
      success: true,
      message: 'message sended successfully, plz wait you will be notified',
    });

  } catch (error) {
    console.error('Create message API Error:', error);
    return res.status(500).send({
      success: false,
      message: 'Create message API Error',
      error: error.message,
    });
  }
};


module.exports = { createUserController };