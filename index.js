require('dotenv').config();
const connectToDatabase = require('./db');
const app = require('./server'); 

async function initializeApp() {
  try {
    await connectToDatabase();
    app.listen(process.env.PORT || 3001, () => {
      console.log(`Server listening on port ${process.env.PORT || 3001}`);
    });
  } catch (error) {
    console.error('Error initializing app:', error);
  }
}

initializeApp();
