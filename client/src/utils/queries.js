// MJS 4.22.24 - client/src/utils/quires.js file. 
// Includes query_me.  Used Act21-26 as starting point. 
// Most of the following can be copied and pasted from GQL. 
import { gql } from '@apollo/client';

// MJS 4.22.24 - 
// Note no books for GEt_ME. Too long to print. 
export const GET_ME = gql`
query me {
  me {
    _id
    email
    username
  }
}
`;

// Get me, including all data. ie. embedded or populated favorites
export const GET_ME_ALL = gql`
query me {
  me {
    _id
    email
    username
    favorites {
      title
      bookId
      authors
      description
      image
      link
    }
  }
}
`;

// Use the username to get all info including embedded favorites array.
export const GET_USER = gql`
query getUser($username: String!) {
  user(username: $username) {
    _id
    username
    email
    favorites {
      title
      bookId
      authors
      description
      image
      link
    }
  }
}
`;

export const QUERY_THOUGHTS = gql`
  query getThoughts {
    thoughts {
      _id
      thoughtText
      thoughtAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_THOUGHT = gql`
  query getSingleThought($thoughtId: ID!) {
    thought(thoughtId: $thoughtId) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query meX {
    meX {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        thoughtAuthor
        createdAt
      }
    }
  }
`;

