// MJS 5.2.24 - client/src/pages/NewFightFrom.jsx from MJS hw21 and uri starter code. 
// Goal: Get create working.  Then create a form to accept data. 
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

const NewFightForm = ( ) => { 
  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');
  // create state to hold saved bookId values
  // const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());
  // const [createBook, { error }] = useMutation(CREATE_BOOK); // must be outside handleForm promise
  // const [addThought, { error }] = useMutation(ADD_THOUGHT, 
  //   {refetchQueries: [QUERY_THOUGHTS, 'getThoughts', QUERY_ME, 'me']});
  const [createBook, { error }] = useMutation(CREATE_BOOK, 
        {refetchQueries: [GET_ME, 'me']});

  const handleInputChange = (event) => {
      const { name, value } = event.target;
      setUserFormData({ ...userFormData, [name]: value });
  }; 

  // Sample from SingleThough26 
  // const { loading, data } = useQuery(QUERY_SINGLE_THOUGHT, { variables: { thoughtId: thoughtId }, });
  // Added next line for GraphQL. Basically find out who is logged in. // must be outside handleForm promise
  const { loading, data } = useQuery(GET_ME, { variables: {  }, });  
  console.log("NewFight GET_ME returned data ", data); 

  let good = false; 
  if (!!data && data.me && data.me.username) {
        console.log("SearchBooks GET_ME result contains data.me.username"); 
        good = true;
      }
  let username = "MJS"; 
  if (good) {
    username = data.me.username;
  } else {
    console.log("NewFightForm query GET_USER returned no data: ", data); 
    console.log("Setting username to MJS"); 
  } 
  console.log("NewFightForm GET_ME returned username ", username);  // works with data

  // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  // useEffect(() => {
  //   return () => saveBookIds(savedBookIds);
  // });  // end useEffect

  // create method to create new record (and insert ptr to it in User.myFights)
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("NewFightForm.jsx handleFormSubmit saving for userID ", username); 
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {  return false;    }
    try {
        console.log("NewFight.jsx handleCreateBook got token ... creating book using token ", token); 
        // Create the book to save by copying form data to vars 
        const title = "Book One"; 
        const bookId = "7449292";
        const description = "Book One Desc"; 
        const authors = [ "Author1" ]; 
        const image = null; 
        const link = null;
        const comments = []; 
        const bookToSave = { title, bookId, authors, description, image, link, comments }; 
        console.log("NewFightForm.jsx handleFormSubmit title ", bookToSave.title, " gBookId ", bookToSave.bookId); 
        const vars = { username: username, ...bookToSave}; 
        console.log("NewFight.jsx handleCreateBook creating book using ", vars); 
        //  const { data } = await login({variables: { ...formState },}); // Analagous line from LoginForm.jsx 
        //  thoughtAuthor: Auth.getProfile().data.username,
        const { data } = await createBook({variables: vars,});
        console.log("Created book. Returned data: ", data); 
        // if book successfully saves to user's account, save book id (only) to state
        setSavedBookIds([...savedBookIds, bookToSave.bookId]);
        // setThoughtText('');
      } catch (err) {
        console.error(err);
      }
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
      {/* This is needed for the validation functionality above */}
      <Form noValidate onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your input!
        </Alert>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='username'>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='MJS Your username'
            name='username'
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Your email address'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.username && userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  ); // end return html-react code
};

export default NewFightForm;
