require('dotenv').config();
const server = require('./server.js');
const mongoose = require('mongoose'); // Code that communicates with the database
const seed = require('./seed.js');

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.DB_KEY); // Establish the connection
    console.log('Connected to MongoDB');

    // Seed the database after successful connection
    await seed(); // Assuming the seed function returns a promise or is an async function

    // Start the server after seeding the database
    server.start(process.env.PORT || 3001); // Start your server
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToDatabase();
