// MJS 4.21.24 - Book.js REST schema.  Users have embedded array of books. 
const { Schema, model } = require('mongoose');

// import schema from Book.js
const userSchema = require('./User');

// This is a subdocument schema, it won't become its own model but 
// we'll use it as the schema for the User's `savedBooks` array in User.js
// Comment via 21-24 Thought. Got rid of required for description. 
const bookSchema = new Schema({
  authors: [
    { type: String, },
  ],
  description: {
    type: String,
  },
  // saved book id from GoogleBooks
  bookId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});
// removed from comments-createdAt        get: (timestamp) => dateFormat(timestamp),

const Book = model('Book', bookSchema);
module.exports = Book;
