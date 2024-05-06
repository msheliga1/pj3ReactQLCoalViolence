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
  const [userFormData, setUserFormData] = useState({ title: '', coalcamp:'', state: '', description: '' });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const { loading, data } = useQuery(GET_ME, { variables: {  }, });  
  console.log("NewFight GET_ME returned data ", data);   
  if (!data || !data.me || !data.me.username) {
    console.log("SearchBooks GET_ME result missing data.me.username ... can't save."); 
    return; 
  }
  const username = data.me.username; 
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

  // Method to create new record (and insert ptr to it in User.myFights)
  const handleFormSubmit = async (event) => {
    event.preventDefault(); 
    console.log("NewFightForm.jsx handleFormSubmit saving for user ", username); 
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {  return false;    }
    try {
        console.log("NewFight.jsx handleCreateBook got token ... creating book using token ", token); 
        // Create the book to save by copying form data to vars 
        const title = userFormData.title; 
        const bookId = userFormData.coalcamp;
        const description = userFormData.description; 
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
          <Form.Label htmlFor='username'>Title</Form.Label>
          <Form.Control
            type='text'
            placeholder='Incident Title'
            name='title'
            onChange={handleInputChange}
            value={userFormData.title}
            required
          />
          <Form.Control.Feedback type='invalid'>Title is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='coalcamp'>Coal Camp</Form.Label>
          <Form.Control
            type='text'
            placeholder='Camp Camp or Other Town'
            name='coalcamp'
            onChange={handleInputChange}
            value={userFormData.coalcamp}
            required
          />
        <Form.Control.Feedback type='invalid'>State is required!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='state'>State Abbreviation</Form.Label>
          <Form.Control
            type='text'
            maxlength='2'
            placeholder='State or province 2 character abbreviation'
            name='state'
            onChange={handleInputChange}
            value={userFormData.state}
            required
          />
          s<Form.Control.Feedback type='invalid'>State is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='description'>Description Text Area</Form.Label>
          <Form.Control
            as="textarea" rows={15}
            placeholder='Your Story'
            name='description'
            onChange={handleInputChange}
            value={userFormData.description}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.title && userFormData.state && userFormData.description)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  ); // end return html-react code
}; // end signupForm

export default NewFightForm;
