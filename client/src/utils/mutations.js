import { gql } from '@apollo/client';
// LOGIN_USER will execute the loginUser mutation set up using Apollo Server.
// ADD_USER will execute the addUser mutation.//
// SAVE_BOOK will execute the saveBook mutation.
// REMOVE_BOOK will execute the removeBook mutation.

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($username: String!, $bookId: String!, $title: String!, $description: String!, $authors: [String]!) {
    saveBook(username: $username, bookId: $bookId, title: $title, description: $description, authors: $authors) {
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
 s }
`;

// Samples from Act 21-26
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
