const mongoose = require('mongoose');

async function connectToDatabase() {
  try {
    console.log('DB_KEY:', process.env.DB_KEY);
    await mongoose.connect(process.env.DB_KEY);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

module.exports = connectToDatabase;
