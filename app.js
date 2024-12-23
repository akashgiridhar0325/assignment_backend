// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');

// Load environment variables from .env file
dotenv.config();
console.log('Mongo URI:', process.env.MONGO_URI); // Debugging line

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: '*', // Temporarily allow all origins
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// MongoDB connection
const mongoUri = process.env.MONGO_URI; // Get URI from environment variables
console.log('Mongo URI:', mongoUri); // Debugging to ensure MONGO_URI is loaded correctly

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Use the auth routes
app.use('/api/auth', authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
