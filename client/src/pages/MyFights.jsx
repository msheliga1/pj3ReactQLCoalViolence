// MJS 5.2.24 - client/src/pages/MyFights.jsx from hw21 savedBooks - uri starterCode. 
// Goal: Display Fights user has created. 
import { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';

import { getMe, deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME, GET_ME_ALL } from '../utils/queries'; 
import { REMOVE_BOOK } from '../utils/mutations'; 

// Remove the useEffect() Hook that sets the state for UserData.
// Instead, use the useQuery() Hook to run the GET_ME query on load and save it to a variable named userData.
const MyFights = () => {
  console.log("Starting MyFights ..."); 
  // it seems that userData is what is displayed in the html 
  const [userData, setUserData] = useState({});  // here is the user localStorage variable

  const [removeBook, { error }] = useMutation(REMOVE_BOOK); // must be outside handleXXX method
  const { loading, data } = useQuery(GET_ME_ALL, { variables: { }, });  

  console.log("MyFights GET_ME_ALL returned data ", data); 
  if (!data) { 
    console.log("MyFights userQuery(GET_ME_ALL) no data: ", data); 
    return false; 
  }
  if (!data.me) { 
    console.log("MyFights userQuery(GET_ME_ALL) no data.me: ", data.me); 
    return false; 
  }
  if (!data.me.username) { 
    console.log("MyFights userQuery(GET_ME_ALL) no data.me.username: ", data.me.username); 
    return false; 
  }
  const userMe = data.me; 
  console.log("Saved books. user from GET_ME_ALL data.me: ", userMe); 
  console.log("Saved books. user from GET_ME_ALL data.me.username: ", userMe.username); 
  console.log("Saved books. user from GET_ME_ALL data.me.myFights.length: ", userMe.myFights.length); 

  // This occassionally gives "More hooks than previous render (even after rebuild and server restart)
  // But the seems work sometimes. MJS 4.25.24
  // Problem seems to occur after logging out and logging back in.  
  const justMe = useQuery(GET_ME, { variables: {  }, });  // justMe has loading and data fields
  console.log("MyFights GET_ME returned ", justMe); 
  const data3 = justMe.data; 
  console.log("MyFights GET_ME returned data ", data3); 
  const us3 = data3.me; 
  console.log("MyFights GET_ME returned data.me ", us3); 

  // This seems to work. MJS 4.25.24 
  /* const getMeAll = useQuery(GET_ME_ALL, { variables: { }, });  
  console.log("MyFights getMeAll = useQuery(...) is ", getMeAll); 
  const loading2 = getMeAll.loading;
  const data2 = getMeAll.data;   
  console.log("MyFights getMeAll data  ", data2);  */ 

  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
    const getUserData = async () => {
      console.log("Staring MyFights - getUserData..."); 
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
          console.log("Saved books. Could not get token. returning."); 
          return false;
        }
        console.log("MyFights found token: ", token.substring(0,4), "..."); 
        // As suspected, cant call useQuery(GET_ME) hook here. 
        // Error: hooks can only be called inside body of function component.

        /* const response = await getMe(token);
        if (!response.ok) { throw new Error('something went wrong!');  }
        const user = await response.json(); */ 
        setUserData(userMe);
      } catch (err) {
        console.log("MyFights getUserData error: ", err); 
        console.error(err);
      }
    };  // end getUserData
    getUserData();
    // next line means run method when userDataLength changes, as well as page load
  }, [userDataLength]);  // end useEffect

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleUpdateFight = async (bookId) => {
    console.log("MyFights.jsx handleUpdateFight starting ... "); 
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      console.log("MyFights handleUpdateFight. Could not get token. "); 
      return false;
    }
    try {
      // const response = await deleteBook(bookId, token);
      // if (!response.ok) { throw new Error('something went wrong!'); }
      // const updatedUser = await response.json();
      const username = userMe.username; 
      const vars = { username, bookId }; 
      console.log("MyFights handleUpdateFight deleting book using ", vars); // correct
      const { data } = await removeBook({variables: vars,});
      console.log("MyFights handleUpdateFight saveBook data ", data); 
      const dataRemoved = data.removeBook;  // this is actually the updated User
      const booksLeft = dataRemoved.myFights.length; 
      console.log("MyFights handleUpdateFight username: ", dataRemoved.username, " savedBookCount ", booksLeft);
      setUserData(dataRemoved);  // originally updatedUser
      console.log("MyFights handleUpdateFight reset UserData for ", dataRemoved.username);
      // upon success, remove book's id from localStorage
      removeBookId(bookId); 
      console.log("MyFights handleUpdateFight book removed from local storage ", bookId);
    } catch (err) {
      console.error(err);
    }
  }; // end handleUpdateFight 

  // if data isn't here yet, say so
  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing Historical Coal Camp Incidents You Created</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.myFights.length
            ? `Viewing ${userData.myFights.length} saved ${userData.myFights.length === 1 ? 'incident' : 'incidents'}:`
            : 'You have not created any historical coal camp violence incidents!'}
        </h2>
        <Row>
          {userData.myFights.map((book) => {
            return (
              <Col md="4">
                <Card key={book.bookId} border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleUpdateFight(book.bookId)}>
                      Update this Incident!
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

export default MyFights;
