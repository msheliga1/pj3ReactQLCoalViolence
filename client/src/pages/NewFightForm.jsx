import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

// First change compared to Act26 (at one time was looking at WRONG file)
// import { createUser } from '../utils/API';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_USER2 } from '../utils/mutations';  // correct name 4.23.24
import { GET_ME } from '../utils/queries';
import { CREATE_BOOK } from '../utils/mutations';
import Auth from '../utils/auth';

const NewFightForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  // "Convert" ADD_USER2 mutation to addUser method
  // const [addUser, { error, data }] = useMutation(ADD_USER2);
  // const [createBook, { error }] = useMutation(CREATE_BOOK); // must be outside handleForm promise
  // const [addThought, { error }] = useMutation(ADD_THOUGHT, 
  //   {refetchQueries: [QUERY_THOUGHTS, 'getThoughts', QUERY_ME, 'me']});
  const [createBook, { error }] = useMutation(CREATE_BOOK, 
    {refetchQueries: [GET_ME, 'me']});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  }; 
  // const username = "s8"; 

  // Method to create new record (and insert ptr to it in User.myFights)
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const username = "s9"; 
    console.log("NewFightForm.jsx handleFormSubmit saving for userID ", username); 
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {  return false;    }
    try {
        console.log("NewFight.jsx handleCreateBook got token ... creating book using token ", token); 
        // Create the book to save by copying form data to vars 
        const title = "Book1 NewFightForm"; 
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
        // setThoughtText('');
      } catch (err) {
        console.error(err);
      } 
    };  // end handleFormSubmit 
  
  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
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
}; // end signupForm

export default NewFightForm;
