const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: Boolean}
});

const BookModel = mongoose.model('Book', bookSchema); // initializes the schema

module.exports = BookModel;
