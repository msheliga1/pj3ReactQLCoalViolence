// MJS 4.23.24 - client/src/pages/SavedBooks.jsx from uri starterCode. 
// Goal convert from REST to GraphQL 
import { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';

import { getMe, deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries'; 

// Remove the useEffect() Hook that sets the state for UserData.
// Instead, use the useQuery() Hook to run the GET_ME query on load and save it to a variable named userData.
const SavedBooks = () => {
  console.log("Staring SavedBooks ..."); 
  const [userData, setUserData] = useState({});  // here is the user variable

  const { loading, data } = useQuery(GET_ME, { variables: { }, });  
  console.log("SavedBooks GET_ME returned data ", data); 
  if (!data) { 
    console.log("SavedBooks userQuery(GET_ME) no data: ", data); 
    return false; 
  }
  if (!data.me) { 
    console.log("SavedBooks userQuery(GET_ME) no data.me: ", data.me); 
    return false; 
  }
  if (!data.me.username) { 
    console.log("SavedBooks userQuery(GET_ME) no data.me.username: ", data.me.username); 
    return false; 
  }
  let userMe = data.me; 
  userMe = { ...userMe, savedBooks:[]} ; 
  console.log("Saved books. user from data.me: ", userMe); 
  console.log("Saved books. user from data.me.username: ", userMe.username); 

  const user = userMe; 


  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
    const getUserData = async () => {
      console.log("Staring SavedBooks - getUserData..."); 
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
          console.log("Saved books. Could not get token. returning."); 
          return false;
        }
        console.log("SavedBooks found token: ", token); 
        // As suspected, cant call useQuery(GET_ME) hook here. 
        // Error: hooks can only be called inside body of function component.

        /* const response = await getMe(token);
        if (!response.ok) {
          throw new Error('something went wrong!');
        }
        const user = await response.json(); */ 

        setUserData(user);
      } catch (err) {
        console.log("SavedBooks getUserData error: ", err); 
        console.error(err);
      }
    };  // end getUserData
    getUserData();
    // next line means run method when userDataLength changes, as well as page load
  }, [userDataLength]);  // end useEffect

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const response = await deleteBook(bookId, token);
      if (!response.ok) {
        throw new Error('something went wrong!');
      }
      const updatedUser = await response.json();
      setUserData(updatedUser);
      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  }; // end handleDeleteBook 

  // if data isn't here yet, say so
  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => {
            return (
              <Col md="4">
                <Card key={book.bookId} border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>  
            );
          })}
        </Row>
      </Container>
    </>
  ); // end return html-react
}; // end const savedBooks => ... 

export default SavedBooks;
