// MJS 4.28.24 project 3 MERN GraphQL Coal Violence 
// User-Incident-Comment. commentAuthor mmtches User.username. Auto-put in from context. 
// MJS 4.18.24 moded Act21-24. 

  // New bookID is from googleBooks  
  // part of User     books: [Book] => savedBooks works in GQL 4.28.24 MJS
  // Unsure about _id.  This is NOT in the REST User.js model. 
  // Project description states: User type: _id, username, email, bookCount, savedBooks
  // But cannot get getById to work. Arghhhh
  // Create user auto-generates an ID. 
  // users and user(username) works. 

  // -------------- Queries --------------
  // me: Which returns a User type.

  // ---------- Mutatiions --------------
  // login: Accepts an email and password as parameters; returns an Auth type.  
  // addUser: Accepts username, email, and pw as params; returns an Auth type.  
  // saveBook: Accepts book authors array, descript, title, bookId, image, and link params
  //          returns a User type. (Look into creating an input type to handle all of these params!)
  // removeBook: Accepts a book's bookId as a parameter; returns a User type.

  // When User references savedBooks, this MUST be [Book], similar to Act21-26 which has [Thought] 
  // even though addThought uses .create and { $addToSet: { thoughts: thought._id } }
  const typeDefs = `
  type User {
    _id: ID
    username: String! 
    email: String! 
    password: String! 
    savedBooks: [Book]! 
  }

  type Book {
    _id: ID
    bookId: String!  
    title: String!   
    description: String
    authors: [String]! 
    image: String
    link: String
    comments: [Comment]! 
  } 

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    books: [Book]
    usersEmb: [User]
    usersPopBooks: [User]
    user(username: String!): User
    userById(userId: ID!): User
    userPopBooks(username: String!): User
    book(bookId: ID!): Book
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(     username: String!, bookId: String!, title: String!, description: String, 
                  authors: [String]!, image: String, link: String): User
    createBook(username: String!, bookId: String!, title: String!, description: String, 
                  authors: String, image: String, link:String): Book
    saveBookById( userId: ID!, bookId: String!, title: String!, description: String!, 
                  authors: [String]!, image: String, link: String): User
    removeUser(userId: ID!): User
    removeBook(username: String!, bookId: String!): User  
    removeBookById(userId: ID!, bookId: String!): User  
    addBookOld(bookText: String!, bookAuthor: String!): Book 
    addComment(bookId: ID!, commentText: String!, commentAuthor: String!): Book
    removeComment(bookId: ID!, commentId: ID!): Book
  }
`;

//     addThought(thoughtText: String! }: Thought
// Old exampls 
 
/* type Book {
    _id: ID
    bookText: String
    bookAuthor: String
    createdAt: String
    comments: [Comment]!
  } */ 

/* type Query {
  users: [User]
  getAllUsersNoBook: [User]
  user(username: String!): User
  books(username: String): [Book]
  book(bookId: ID!): Book
} */ 

/* Mutations 
    addBook(bookText: String!, bookAuthor: String!): Book
*/ 
module.exports = typeDefs;
