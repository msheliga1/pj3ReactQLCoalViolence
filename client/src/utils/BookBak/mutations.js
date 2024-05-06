import { gql } from '@apollo/client';
// LOGIN_USER will execute the loginUser mutation set up using Apollo Server.
// ADD_USER will execute the addUser mutation. 
// SAVE_BOOK will execute the saveBook mutation, with the book embedded in a user. 
// CREATE_BOOK executes the createBook mutation, with a non-embedded book. 
// UNFAVOR execute unfavor mutation, which is a PUT. Removes book from users favorites array. 
// REMOVE_BOOK will execute the removeBook mutation.
// These methods are imported and used in react .jsx pages such as searchBoooks and SavedBooks. 

// Note no email returned in Act26, nor favorites or similar
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        favorites {
          bookId
          title
          description
          authors
          image
          link
        }
        myFights {
          bookId
          title
          description
          authors
          image
          link
        }
      }
    }
  }
`;

// Changed name from ADD_USER to ADD_USER2 since SignUpForm threw ADD_USER not a function error. 
// Note no email returned in Act 26. Used by client/src/pages/SearchBooks.jsx 
export const ADD_USER2 = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

// MJS 4.23.24. Made description optional since some books dont have it.  Added image and link
// This is an EMBEDDED route that returns the user who embeds the book.  No create used. 
export const SAVE_BOOK = gql`
mutation saveBook($username: String!, $bookId: String!, $title: String!, $authors: [String]!, $description: String, $image: String, $link: String) {
  saveBook(username: $username, bookId: $bookId, title: $title, authors: $authors, description: $description, image: $image, link: $link) {
    _id
    email
    username
    favorites {
      bookId
      title
      description
      authors
      image
      link
    }
    myFights {
      bookId
      title
      description
      authors
      image
      link
    }
  }
}
`;

// create book. Also create reference from user to book.  This only returns a book, not the user, 
// so no email or username permitted in results.  If you stick email or username in results get a 400 not-found err 
// when calling this routine. 
export const CREATE_BOOK = gql`
mutation CreateBook($username: String!, $bookId: String!, $title: String!, $authors: [String]!, $description: String, $image: String, $link: String) {
  createBook(username: $username, bookId: $bookId, title: $title, authors: $authors, description: $description, image: $image, link: $link) {
    _id
    bookId
    title
  }
}
`;

export const CREATE_BOOK_LONG = gql`
mutation CreateBook($username: String!, $bookId: String!, $title: String!, $authors: [String]!, $description: String, $image: String, $link: String) {
  createBook(username: $username, bookId: $bookId, title: $title, authors: $authors, description: $description, image: $image, link: $link) {
    _id
    bookId
    title
    description
    authors
    image
    link
    comments {
      _id
      commentText
      commentAuthor
      createdAt
    }
  }
}
`;

export const UNFAVOR = gql`
mutation unfavor($userId: ID!, $objId: ID!) {
  unfavor(userId: $userId, objId: $objId) {
    _id
    username
    email
    favorites {
      _id
      title
      bookId
    }
  }
}
`;

export const REMOVE_BOOK = gql`
mutation removeBook($username: String!, $bookId: String!) {
    removeBook(username: $username, bookId: $bookId) {
      _id
      email
      username
      favorites {
        bookId
        title
        description
        authors
        image
        link
      }
      myFights {
        bookId
        title
        description
        authors
        image
        link
      }
    }
  }
`;

// Samples from Act 21-26 -------- 
export const ADD_THOUGHT = gql`
  mutation addThought($thoughtText: String!) {
    addThought(thoughtText: $thoughtText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($thoughtId: ID!, $commentText: String!) {
    addComment(thoughtId: $thoughtId, commentText: $commentText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
