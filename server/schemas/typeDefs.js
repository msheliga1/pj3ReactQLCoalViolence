// MJS 4.18.24 moded Act21-24. Also did this for my Mini Project. 
// But this one already has a User Type. Thought baiscally becomes Comment, 
// which was embedded in Thoughts previously in Act 21-24. 

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

  const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]
  }

  type Book {
    bookId: String!  
    title: String!   
    description: String! 
    authors: [String]! 
    image: String
    link: String
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
    users: [User]
    usersBookPopulate: [User]
    user(username: String!): User
    userById(userId: ID!): User
    userBookPopulate(username: String!): User
    book(bookId: ID!): Book
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBookById( userId: ID!, bookId: String!, title: String!, description: String!, 
                  authors: [String]!, image: String, link: String): User
    saveBook(     username: String!, bookId: String!, title: String!, description: String!, 
                  authors: [String]!, image: String, link: String): User
    removeBook(userId: ID!, bookId: String!): User  
    addBookOld(bookText: String!, bookAuthor: String!): Book 
    saveBookCreate(bookId: String!, title: String, description: String, authors: String, image: String, link:String): Book
    addComment(bookId: ID!, commentText: String!, commentAuthor: String!): Book
    removeComment(bookId: ID!, commentId: ID!): Book
  }
`;

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
