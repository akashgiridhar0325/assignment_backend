const mongoose = require('mongoose');

// Define the schema for the user
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { collection: 'assignment_users_data' }
);

// Create and export the model
const User = mongoose.model('User', userSchema, 'assignment_users_data');

module.exports = User;
