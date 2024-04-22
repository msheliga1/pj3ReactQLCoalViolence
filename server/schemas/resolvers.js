// MJS 4.18.24 - From MERN Act 21-24 jwt. 
// Example of user that can have manhy books. 
// Not use of Authenticotor error in utils/auth, which replaces 
// REST authMiddleware method. 
const { User, Book } = require('../models');

const { signToken, AuthenticationError } = require('../utils/auth');

const { ObjectId } = require('mongodb'); // per stack ovdrflow

const resolvers = {
  // -------------- Queries --------------
  // me: Which returns a User type.
  // users: Used for debgging.
  // user: Used for debgging.
  // userById: for debugging.  Could not get to work. Arghhh. 
  Query: {
    // Moded from Act21-26. MJS need args here before context, which is the 3rd argument
    // Me returns the logged in user via findOne(contest.user._id)
    me: async (parent, args, context) => {
      console.log("Starting me query with context.user", context.user); 
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      console.log("Throwing me query not logged in AuthenticatonError ... ");
      // MJS 4.22.24. Produces a "AuthenticalError is not a constructor error"
      throw new AuthenticationError('You need to be logged in!');
      // throw new AuthenticationError('You need to be logged in!');  // gives AuthenticationError isnt a function. 
    },
    users: async () => {   // used for testing.  
        return User.find()
        // return User.find().populate('books');
    }, 
    usersBookPopulate: async () => {  // wont work since books is embedded
      return User.find().populate('books');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    userById: async (parent, { userId }) => {
      // wont work without new.  But case fails for new ObjectId(userId)
      // const newId = new ObjectId(userId);   // saw similar in GraphQL. Imported above. Still wont work 
      console.log("Getting user by ID ", userId); 
      const origUser = await User.findById({ userId });
      console.log("Get UserById findById ", origUser);  // returns null 
      return User.findOne({ userId });
    },
    userBookPopulate: async (parent, { username }) => {  // wont work since books is embedded
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

  // ---------- Mutatiions --------------
  // login: Accepts an email and password as parameters; returns an Auth type.  
  // addUser: Accepts username, email, and pw as params; returns an Auth type.  
  // saveBook: Accepts book authors array, descript, title, bookId, image, and link params
  //          returns a User type. (Look into creating an input type to handle all of these params!)
  // removeBook: Accepts a book's bookId as a parameter; returns a User type.
  Mutation: {  // added savedBooks [] to User.create. 
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
    },  // end login 
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password, "savedBooks":[] });
      const token = signToken(user);
      return { token, user };  // This returns a user in GraphQL
      // return { user }; 
    }, // end adduser 
    // This mimics add comment which was embedded in thoughts-book, but cant get userID to work. 
    // Also cant get findById instead of findOne to work.  So passing in username insteaed. 
    saveBook: async (parent, { username, bookId, title, description, authors, image, link  }) => {
      console.log("Saving book from user name ", username, " with gBookId ", bookId, " ", title); 
      const origUser = await User.findOne({ username });
      console.log("User from findOne ", origUser);  // returns correct value
      const user = await User.findOneAndUpdate(
        { username: username }, 
        // Note savedBooks, not just books !!!! - ARgghh 
        { $addToSet: { savedBooks: { bookId, title, description, authors, image, link } }, },
        { new: true, runValidators: true, }
      );
      console.log("User from findOneAndUpdate ", user);  // returns empty books array
      return user; 
    },  // end AddBook  
    // This mimics add comment which was embedded in thoughts-book. Does NOT work 4.22.24 
    saveBookById: async (parent, { userId, bookId, title, description, authors, image, link  }) => {
          console.log("Saving book from userId ", userId, " with gBookId ", bookId, " ", title); 
          const origUser = await User.findOne({ userId });
          console.log("User from findOne ", origUser);  // returns null 
          return User.findOneAndUpdate(
            { _id: userId },
            { $addToSet: { savedBooks: { bookId, title, description, authors, image, link } }, },
            { new: true, runValidators: true, }
          );
        },  // end AddBook
    // This mimics removeComment which was embedded in old Thought
    removeBook: async (parent, { username, bookId }) => {
      console.log("Removing book from username ", username, " with gBookId ", bookId); 
      const origUser = await User.findOne({ username });
      console.log("User from findOne ", origUser);  // returns null 
      // removeComment method from Book code was  { _id: bookId },
      const user = await User.findOneAndUpdate(
        { username },
        { $pull: { savedBooks: { bookId: bookId } } },
        { new: true }
      );; 
      console.log("Revmoved book ... returning updated user."); 
      return user; 
    }, // end removeBook returns User
    // This mimics removeComment which was embedded in old Thought. Does NOT work MJS 4.22.24 
    removeBookById: async (parent, { userId, bookId }) => {
          console.log("Removing book from user ", userId, " with gBookId ", bookId); 
          const origUser = await User.findOne({ userId });
          console.log("User from findOne ", origUser);  // returns null 
          //   removeComment from Book code was  { _id: bookId },
          const user = await User.findOneAndUpdate(
            { _id: userId },
            { $pull: { savedBooks: { bookId: bookId } } },
            { new: true }
          );; 
          console.log("Revmoved book ... returning updated user."); 
          return user; 
    }, // end removeBook returns User 
    // ------------- Old examples --------------------
    addBookOld: async (parent, { bookText, bookAuthor  }) => {  // old Thought example 
      const book = await Book.create({ bookText, bookAuthor });
      await User.findOneAndUpdate(
        { username: bookAuthor },
        { $addToSet: { books: book._id } }
      );
      return book;
    }, // end addBookOld via addThought
    // saveBookCreate mimics addBook which used Book(Thought).create 
    saveBookCreate: async (parent, { bookId, title, description, authors, image, link }) => {
      const book = await Book.create({ bookId, title, description, authors, image, link  });
      await User.findOneAndUpdate(
        { $addToSet: { books: book } }
      );
      return book; 
    }, // end addBookCreate
    /* 
    removeBookOld: async (parent, { bookId }) => {
      return Book.findOneAndDelete({ _id: bookId });
    }, // end removeBookOld via fk for Thougth  */
    // ---------------------------------------------------
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
    },  // end AddComment
    removeComment: async (parent, { bookId, commentId }) => {
      return Book.findOneAndUpdate(
        { _id: bookId },
        { $pull: { comments: { _id: commentId } } },
        { new: true }
      );
    },  // end removeComment
  },
};

module.exports = resolvers;
