import { gql } from '@apollo/client';
// LOGIN_USER will execute the loginUser mutation set up using Apollo Server.
// ADD_USER will execute the addUser mutation.//
// SAVE_BOOK will execute the saveBook mutation.
// REMOVE_BOOK will execute the removeBook mutation.

// Note no email returned in Act26, nor savedBooks or similar
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        savedBooks {
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
// Note no email returned in Act 26
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
export const SAVE_BOOK = gql`
mutation SaveBook($username: String!, $bookId: String!, $title: String!, $authors: [String]!, $description: String, $image: String, $link: String) {
  saveBook(username: $username, bookId: $bookId, title: $title, authors: $authors, description: $description, image: $image, link: $link) {
    _id
    email
    username
    savedBooks {
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

export const REMOVE_BOOK = gql`
mutation removeBook($username: String!, $bookId: String!) {
    removeBook(username: $username, bookId: $bookId) {
      _id
      email
      username
      savedBooks {
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
