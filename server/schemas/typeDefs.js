// MJS 4.18.24 moded Act21-24. Also did this for my Mini Project. 
// But this one already has a User Type. Thought baiscally becomes Book. 

  /* type Book {
    _id: ID
    bookText: String
    bookAuthor: String
    createdAt: String
    comments: [Comment]!
  } */ 
  // New bookID is from googleBooks  
 // part of User     books: [Book] => savedBooks works in GQL 4.28.24 MJS
const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]
  }

  type Book {
    authors: [String]! 
    description: String!
    bookId: String!      
    image: String
    link: String
    title: String!
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
    getAllUsersNoBook: [User]
    user(username: String!): User
    book(bookId: ID!): Book
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addBook(bookText: String!, bookAuthor: String!): Book
    addComment(
      bookId: ID!
      commentText: String!
      commentAuthor: String!
    ): Book
    removeBook(bookId: ID!): Book
    removeComment(bookId: ID!, commentId: ID!): Book
  }
`;

/* type Query {
  users: [User]
  getAllUsersNoBook: [User]
  user(username: String!): User
  books(username: String): [Book]
  book(bookId: ID!): Book
} */ 
module.exports = typeDefs;
