// MJS 4.18.24 - From MERN Act 21-24 jwt. 
// Example of user that can have many books. 
// Note use of Authenticotor error in utils/auth, which replaces 
// REST authMiddleware method. 
const { User, Book } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const { ObjectId } = require('mongodb'); // per stack ovdrflow

const resolvers = {
  // -------------- Queries --------------
  // me: Which returns a User type (no books).
  // users: Used for debgging.
  // user: Used for debgging.
  // userById: for debugging.  Could not get to work. Arghhh. 
  Query: {
    // Moded from Act21-26. MJS need args here before context, which is the 3rd argument
    // Me returns the logged in user via findOne(context.user._id)
    me: async (parent, args, context) => {
      // logs here will show up in the server 
      console.log("Resolvers.js: Starting me query ... "); 
      console.log("Resolver.js me query args", args); 
      if (!context) {throw new AuthenticationError('Context not found in resolver me'); } 
      if (context.user) {
        console.log("Starting me query with context.user", context.user); 
        return User.findOne({ _id: context.user._id }).populate('favorites');
      }
      console.log("Throwing me query not logged in AuthenticatonError ... ");
      // MJS 4.22.24. Produces a "AuthenticalError is not a constructor error"
      throw new AuthenticationError('You need to be logged in!');
      // throw new AuthenticationError('You need to be logged in!');  // gives AuthenticationError isnt a function. 
    },

    // meCore returns the logged in user via findOne(context.user._id). No .populates
    meCore: async (parent, args, context) => {    // logs here will show up in the server 
      console.log("Resolvers.js: Starting meCore query with args", args); 
      if (!context) {throw new AuthenticationError('Context not found in resolver meCore'); } 
      if (context.user) {
        console.log("Starting meCore query with context.user", context.user); 
        return User.findOne({ _id: context.user._id });
      }
      console.log("Throwing me query not logged in AuthenticatonError ... ");
      // MJS 4.22.24. Produces a "AuthenticationError is not a constructor error"
      throw new AuthenticationError('You need to be logged in!');  // gives AuthenticationError isnt a function. 
    },
    // ---------- GET ALL -----------
    users: async () => {   // used for testing.  
        return User.find().populate('favorites'); 
    }, 
    books: async () => {   // used for testing.  
      return Book.find(); 
    }, 
    usersEmb: async () => {   // used for testing. No populate => embedded or dont display favorites 
      return await User.find(); 
    }, 
    usersPopBooks: async () => {  // wont work if books is embedded. Must match typeDef field name. 
      return User.find().populate('favorites');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    book: async (parent, { bookId }) => {
      return Book.findOne({ _id: bookId });
    },
    userById: async (parent, { userId }) => {
      // wont work without new.  But case fails for new ObjectId(userId)
      // const newId = new ObjectId(userId);   // saw similar in GraphQL. Imported above. Still wont work 
      console.log("Getting user by ID ", userId); 
      const origUser = await User.findById( userId );  // not {_id: userID}
      console.log("Get UserById findById ", origUser);  // returns null for {userId}
      return User.findOne({ _id: userId });
    },
    userPopBooks: async (parent, { username }) => {  // wont work if books is embedded
      return User.findOne({ username }).populate('favorites');
    },
    /* books: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Book.find(params).sort({ createdAt: -1 });
    }, */ 
  },

  // ---------- Mutatiions --------------
  // login: Accepts an email and password as parameters; returns an Auth type.  
  // addUser: Accepts username, email, and pw as params; returns an Auth type.  
  // saveBook: Accepts book authors array, descript, title, bookId, image, and link params
  //          returns a User type. (Look into creating an input type to handle all of these params!)
  // removeBook: Accepts a book's bookId as a parameter; returns a User type.
  Mutation: {  // added favorites [] to User.create. 
    login: async (parent, { email, password }) => {
      console.log("Resolvers Attempting to login ... email: ", email); 
      const user = await User.findOne({ email });
      if (!user) {
        console.log("Resolvers login: Could not find email ... "); 
        throw AuthenticationError;
      }
      const correctPw = await user.isCorrectPassword(password);  // from models/User.js which uses bcrypt
      if (!correctPw) {
        throw AuthenticationError;
      }
      console.log("Resolver login: Correct username and password ... signing Toker"); 
      const token = signToken(user);  // from server utils/auth.js
      return { token, user };
    },  // end login 
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password, "favorites":[] });
      const token = signToken(user);
      return { token, user };  // This returns a user in GraphQL
      // return { user }; 
    }, // end adduser 
    // This mimics add comment which was embedded in thoughts-book, but cant get userID to work. 
    // Also cant get findById instead of findOne to work.  So passing in username insteaed. 
    // could add context here.  Get username from it. 
    // Compare this to Act26 which creates a book. 
    saveBook: async (parent, { username, bookId, title, description, authors, image, link }, context) => {
      console.log("Resolver Saving book from user name ", username, " with gBookId ", bookId, " ", title); 
      if (!context) { console.log("SaveBook no context (Expected if run from GQL): ", context); }
      console.log("Resolver SaveBook context.user", context.user); 
      const origUser = await User.findOne({ username });
      console.log("Resolver saveBook User from findOne ", origUser.username, origUser.email, origUser.favorites.length);  // returns correct value
      const comments = [];  // no comments when first adding incident
      const user = await User.findOneAndUpdate(
        { username: username }, 
        // Note favorites, not just books!! - from addUser "favorites":[]
        { $addToSet: { favorites: { bookId, title, description, authors, image, link, "comments":[] },  }, },
        { new: true, runValidators: true, }
      );
      //         { $addToSet: { favorites: { bookId, title, description, authors, image, link, comments },  }, },
      console.log("Resolver saveBook findOneAndUpdate user", user.username, user.email, "books", user.favorites.length);  
      console.log("Resolver saveBook findOneAndUpdate user", user.favorites[0]);  
      return user; 
    },  // end saveBook  

    // saveBookCreate mimics addBook which used Book(Thought).create. Username passed in for GQL testing.
    createBook: async (parent, { username, bookId, title, description, authors, image, link, }) => {
      console.log("createBook resolver (required): ", username, bookId, title);
      console.log("createBook resolver (desc, auth, img, lnk): ", description, authors, image, link); 
 
      const book = await Book.create({ bookId, title, description, authors, image, link, });
      console.log("Created book is ", book); 
 
      // Andrew:  User needs list of Books IDs.  Saving entire book is extra-storage issue. 
      // With set of book Ids, then .populate should work. 
      // { $addToSet: { favorites: book._id } }
      const user = await User.findOneAndUpdate(
        { username: username }, 
        { $addToSet: { favorites: book._id } }, 
        { new: true, runValidators: true, } 
      );
      console.log("Found one and updated user ... ", user); 
      return book; 
    }, // end addBookCreate
    // addThought uses Thought.create and context to get username
    /* addThought: async (parent, { thoughtText }, context) => {
      if (context.user) {
        const thought = await Thought.create({thoughtText, thoughtAuthor: context.user.username, });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { thoughts: thought._id } }
        );
        return thought;
      }
      throw AuthenticationError;
      ('You need to be logged in!');
    }, */ 

    // This mimics add comment which was embedded in thoughts-book. Does NOT work 4.22.24 
    saveBookById: async (parent, { userId, bookId, title, description, authors, image, link  }) => {
          console.log("Saving book from userId ", userId, " with gBookId ", bookId, " ", title); 
          const origUser = await User.findOne({ userId });
          console.log("saveBookById User from findOne ", origUser.username);  // returns null 
          return User.findOneAndUpdate(
            { _id: userId },
            { $addToSet: { favorites: { bookId, title, description, authors, image, link } }, },
            { new: true, runValidators: true, }
          );
    },  // end saveBookById

    // remove a created User. Don't worry about created Books for now. Mimic removeThought Act21-26. 
    // Need this to get rid of "bad" users from DB. 
    removeUser: async (parent, { userId }) => {
            const user = await User.findOneAndDelete({ _id: userId, });
            return user;
          // throw AuthenticationError;
    }, // end removeUser (created)
    // Reomve all users from DB. 
    removeAllUsers: async (parent, { }) => {
      console.log("Removing all users "); 
      const result = await User.deleteMany({  });
      console.log("Remove all users returning ...", result); 
      const str = "It worked"; 
      return str
    }, // end removeUser (created)

    // This mimics removeComment which was embedded in old Thought
    removeBook: async (parent, { username, bookId }) => {
      console.log("Removing book from username ", username, " with gBookId ", bookId); 
      const origUser = await User.findOne({ username });
      console.log("removeBook User from findOne ", origUser.username, origUser.email);  // returns null 
      // removeComment method from Book code was  { _id: bookId },
      const user = await User.findOneAndUpdate(
        { username },
        { $pull: { favorites: { bookId: bookId } } },
        { new: true }
      );; 
      console.log("Removed book ... returning updated user."); 
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
            { $pull: { favorites: { bookId: bookId } } },
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
    /* remove a created Thought, and its User ptr
    removeThought: async (parent, { thoughtId }, context) => {
      if (context.user) {
        const thought = await Thought.findOneAndDelete({
          _id: thoughtId,
          thoughtAuthor: context.user.username,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { thoughts: thought._id } }
        );
        return thought;
      }
      throw AuthenticationError;
    }, // end removeThought (created) */ 
  },
};

module.exports = resolvers;
