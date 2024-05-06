// MJS 5.1.24 - From MJS 4.21.24 From book hw21. . 
const { Schema, model } = require('mongoose');

// import schema from User.js
const userSchema = require('./User');

// This is  its own model. Gets .create
// Comment via 21-24 Thought. Got rid of required for description. 
const fightSchema = new Schema({
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

const Fight = model('Fight', fightSchema);
module.exports = Fight;
