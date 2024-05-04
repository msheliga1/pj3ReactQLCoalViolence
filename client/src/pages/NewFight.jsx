// MJS 5.2.24 - client/src/pages/NewFight.jsx from MJS hw21 and uri starter code. 
// This code not only searches for books, it allows one to create books. 
//  Goal: Get create working.  Then create a form to accept data. 
import { useState, useEffect } from 'react';
import { Container, Col, Form, Button, Card, Row } from 'react-bootstrap';
import Auth from '../utils/auth';

// import { saveBook, searchGoogleBooks } from '../utils/API';
import { searchGoogleBooks } from '../utils/API';  // likely need to search Google
import { saveBookIds, getSavedBookIds } from '../utils/localStorage';
// next 3 lines from commentForm26 
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
// import { useMutation } from '@apollo/client';
import { SAVE_BOOK } from '../utils/mutations';
import { CREATE_BOOK } from '../utils/mutations';
import { GET_ME } from '../utils/queries';

const NewFight = ( ) => { 
  // create state for holding returned google api data
  const [searchedBooks, setSearchedBooks] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');
  // create state to hold saved bookId values
  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());
  // Added next line for GraphQL. Basically convert SAVE_BOOK graphQL into saveBook method. 
  const saveBookArray = useMutation(SAVE_BOOK); // must be outside handleForm promise
  const saveBook = saveBookArray[0];
  const errorBook = saveBookArray[1]; 
  const [createBook, { error }] = useMutation(CREATE_BOOK); // must be outside handleForm promise

  // Sample from SingleThough26 
  // const { loading, data } = useQuery(QUERY_SINGLE_THOUGHT, { variables: { thoughtId: thoughtId }, });
  // Added next line for GraphQL. Basically find out who is logged in. // must be outside handleForm promise
  // God only knows why this works with "data" but not "dataMe". 
  const { loading, data } = useQuery(GET_ME, { variables: {  }, });  
  console.log("NewFight GET_ME returned data ", data); 

  let good = false; 
  if (data) {
    if (data.me) {
      if (data.me.username) {
        console.log("SearchBooks GET_ME result contains data.me.username"); 
        good = true;
      }
    }
  }

  let username = "MJS"; 
  if (good) {
    username = data.me.username;
  } else {
    console.log("Search Books query GET_USER returned no data: ", data); 
    console.log("Setting username to MJS"); 
  } 

  console.log("NewFight GET_ME returned username ", username);  // works with data

  // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveBookIds(savedBookIds);
  });  // end useEffect

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!searchInput) {
      return false;
    }
    try {
      const response = await searchGoogleBooks(searchInput);
      if (!response.ok) {
        throw new Error('Something went wrong searching for a book. ' + searchInput);
      }
      const { items } = await response.json();
      const bookData = items.map((book) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ['No author to display'],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        image: book.volumeInfo.imageLinks?.thumbnail || '',
      }));
      setSearchedBooks(bookData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    } // end try-catch 
  };  // end handleFormSubmit 


  // create function to handle creating a book to our database. Also create ptr in User
  const handleCreateBook = async (bookId) => {
    // find the book in `searchedBooks` state by the matching id
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);
    console.log("NewFight.jsx handleCreateBook saving for userID ", username); 
    console.log("NewFight.jsx handleCreateBook title ", bookToSave.title, " gBookId ", bookToSave.bookId); 
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      console.log("NewFight.jsx handleCreateBook got token ... creating book using token ", token); 
      // GraphQL method from CommentForm26 
      // const { data } = await addComment({
      //  variables: { thoughtId, commentText, commentAuthor: Auth.getProfile().data.username, }, });
      // setCommentText('');
      const vars = { username: username, ...bookToSave}; 
      console.log("NewFight.jsx handleCreateBook creating book using ", vars); 
      //  const { data } = await login({variables: { ...formState },}); // Analagous line from LoginForm.jsx 
      const { data } = await createBook({variables: vars,});
      console.log("Created book. Returned data: ", data); 
      // if book successfully saves to user's account, save book id (only) to state
      setSavedBookIds([...savedBookIds, bookToSave.bookId]);
    } catch (err) {
      console.error(err);
    }
  }; // end handleCreateBook 

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
    []      <h1>Enter a New Incident</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a book'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container>
        <h2 className='pt-5'>
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : 'Search for a book to begin'}
        </h2>
        <Row>
          {searchedBooks.map((book) => {
            return (
              <Col md="4" key={book.bookId}>
                <Card border='dark'>
                  {book.image ? (
                    <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedBookIds?.some((savedBookId) => savedBookId === book.bookId)}
                        className='btn-block btn-info'
                        onClick={() => handleSaveBook(book.bookId)}>
                        {savedBookIds?.some((savedBookId) => savedBookId === book.bookId)
                          ? 'This book has already been saved!'
                          : 'Save this Book! (Old) '}
                      </Button>                      
                    )}   
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedBookIds?.some((savedBookId) => savedBookId === book.bookId)}
                        className='btn-block btn-info'
                        onClick={() => handleCreateBook(book.bookId)}>
                        {savedBookIds?.some((savedBookId) => savedBookId === book.bookId)
                          ? 'This book has already been saved!'
                          : 'Create Book!'}
                      </Button>                      
                    )}                    
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default NewFight;
