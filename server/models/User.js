// MJS 4.21.24 - Orig from starter code.  Note NO _id in this file, but it could?? be auto-generated. 
// Users have an embedded array of savedBooks, as well as a virtual bookCount value. 
// Wether or not GraphQL typeders should have an _id is unclear.  Trying to getById wont work. 
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// import schema from Book.js
// const bookSchema = require('./Book');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    // set savedBooks to be an array of data that adheres to the bookSchema
    // stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }] from mongoosejs.com/docs/populate.html
    // savedBooks: [bookSchema],
    // savedBooks: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `bookCount` with the number of saved books we have
// userSchema.virtual('bookCount').get(function () {
//   return this.savedBooks.length;
// });

const User = model('User', userSchema);

module.exports = User;
