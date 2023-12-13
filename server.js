const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_KEY)
  .then(() => {
    console.log('Mongoose is connected');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const Book = require('./books.js');

const getHomePage = (request, response) => {
  response.status(200).send('Home Page');
};

const getBooks = async (request, response, next) => {
  try {
    let results = await Book.find();
    console.log(results);
    response.status(200).send(results);
  } catch (error) {
    next(error);
  }
};

const createBook = async (request, response, next) => {
  try {
    if (!request.body.title || !request.body.description || !request.body.status) {
      return response.status(400).json({ error: 'Missing required fields' });
    }

    let createdBook = await Book.create(request.body);
    if (!createdBook) {
      return response.status(500).json({ error: 'Failed to create book' });
    }
    
    response.status(200).send(createdBook);
  } catch (error) {
    console.error('Error creating book:', error);
    response.status(500).json({ error: 'Internal server error' });
  }
};

const deleteBook = async (request, response, next) => {
  try {
    let id = request.params.bookID;
    console.log('Deleting', id);
    let deletedBook = await Book.findByIdAndDelete(id);
    response.status(200).json({ message: 'Book was deleted' }); 
  } catch (error) {
    next(error);
  }
};

const updateBook = async (request, response, next) => {
  try {
    let id = request.params.id; 
    let data = request.body;

    const updatedBook = await Book.findOneAndUpdate(
      { _id: id },
      { $set: data },
      { new: true }
    );

    response.status(201).send(updatedBook);
  } catch (error) {
    next(error);
  }
};

app.get('/', getHomePage);
app.get('/books', getBooks);
app.post('/books', createBook);
app.delete('/books/:bookID', deleteBook);
app.put('/book/:id', updateBook);

app.get('*', (request, response) => {
  response.status(404).send('Not available');
});

app.use((error, request, response, next) => {
  response.status(500).json({ error: error.message });
});

module.exports = app;
