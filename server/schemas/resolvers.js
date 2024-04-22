// MJS 4.18.24 - From MERN Act 21-24 jwt. 
// Example of user that can have manhy books. 
// Not use of Authenticotor error in utils/auth, which replaces 
// REST authMiddleware method. 
const { User, Book } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    getAllUsersNoBook: async () => {
      return User.find();
    },
    users: async () => {        
        return User.find()
        // return User.find().populate('books');
    }, 
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('books');
    },
    /* books: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Book.find(params).sort({ createdAt: -1 });
    }, */ 
    book: async (parent, { bookId }) => {
      return Book.findOne({ _id: bookId });
    },
  },

  Mutation: {  // added savedBooks [] to User.create
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password, "savedBooks":[] });
      const token = signToken(user);
      return { token, user };  // This returns a user in GraphQL
      // return { user }; 
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addBook: async (parent, { bookText, bookAuthor }) => {
      const book = await Book.create({ bookText, bookAuthor });

      await User.findOneAndUpdate(
        { username: bookAuthor },
        { $addToSet: { books: book._id } }
      );

      return book;
    },
    addComment: async (parent, { bookId, commentText, commentAuthor }) => {
      return Book.findOneAndUpdate(
        { _id: bookId },
        {
          $addToSet: { comments: { commentText, commentAuthor } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeBook: async (parent, { bookId }) => {
      return Book.findOneAndDelete({ _id: bookId });
    },
    removeComment: async (parent, { bookId, commentId }) => {
      return Book.findOneAndUpdate(
        { _id: bookId },
        { $pull: { comments: { _id: commentId } } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
