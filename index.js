require('dotenv').config();
const mongoose = require('mongoose');
const seed = require('./seed.js');
const server = require('./server.js');

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.DB_KEY);
    console.log('Connected to MongoDB');

    await seed(); 

    server.start(process.env.PORT || 3001);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToDatabase();
