import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

// First change compared to Act26 (at one time was looking at WRONG file)
// import { createUser } from '../utils/API';
import { ADD_USER2 } from '../utils/mutations';  // correct name 4.23.24
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';

const NewFightForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  // "Convert" ADD_USER2 mutation to addUser method
  const [addUser, { error, data }] = useMutation(ADD_USER2);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  }; 

  const handleFormSubmit = async (event) => {
    console.log("handleFormSubmit (SignUpForm.jsx) starting ... "); 
    event.preventDefault();
    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    try {
      // These lines generally changed REST->GQL 
      // const response = await createUser(userFormData);
      console.log("handleFormSubmit trying to ADD_USER2 with userFromData ", userFormData);
      // Next line a poor convert of old method.  Can't treeat ADD_USER2(pararm) as a method. 
      // const response = await ADD_USER2(userFormData); // No Good 
      const { data } = await addUser({variables: { ...userFormData },});
      console.log("handleFormSubmit returned from addUser done: ", data); 

      Auth.login(data.addUser.token);
      // Auth.login(token);
      console.log("handleFormSubmit returned from login done: ");
    } catch (err) {
      console.log("handleFromSubmit catch an err ... setting ShowAlert to true, will display html mesg."); 
      console.error(err);
      setShowAlert(true);
    } // end try-catch
    // code same as Act26 to here

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  }; // end handleFormSubmit
  // code same as Act 26 except for 1 dhange up to here.

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
