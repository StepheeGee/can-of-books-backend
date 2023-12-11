'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const seed = require('./seed.js');
const Book = require('./books.js');

mongoose.connect(process.env.DB_KEY);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get('/test', (request, response) => {
  response.status(200).send('Welcome to Our Server!');
});

app.get('/books', async (request, response, next) => {
  try {
    let results = await Book.find();
    console.log(results);
    response.status(200).send(results);
  } catch (error) {
    next(error);
  }
});

app.post('/books', async (request, response, next) => {
  try {
    // Validation logic for input
    if (!request.body.title || !request.body.description || !request.body.status) {
      return response.status(400).json({ error: 'Missing required fields' });
    }

    let createdBook = await Book.create(request.body);
    response.status(200).send(createdBook);
  } catch (error) {
    next(error);
  }
});

app.delete('/books/:bookID', async (request, response, next) => {
  try {
    let id = request.params.bookID;
    await Book.findByIdAndDelete(id);
    response.status(200).send('Book was deleted');
  } catch (error) {
    next(error);
  }
});

app.put('/books/:bookID', async (request, response, next) => {
  try {
    let id = request.params.bookID;
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
});

app.get('*', (request, response) => {
  response.status(404).send('Not available');
});

app.use((error, request, response, next) => {
  response.status(500).json({ error: error.message });
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
