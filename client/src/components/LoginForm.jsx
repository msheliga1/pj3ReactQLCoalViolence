// see SignupForm.js for comments
import { useState } from 'react';
// next line NOT in Login26.jsx
import { Form, Button, Alert } from 'react-bootstrap';

// Next line commented out 
// import { loginUser } from '../utils/API';
// next 3 lines added from Login26.jsx 
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

// const LoginForm = () => {
// const [userFormData, setUserFormData] = useState({ email: '', password: '' });
const LoginForm = (props) => {
  const [validated] = useState(false);  // kept from starter code, else render err.
  const [showAlert, setShowAlert] = useState(false); // kept from starter code, else render err
  // no username when logging in. 
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // setUserFormData({ ...userFormData, [name]: value });
    setFormState({...formState, [name]: value,});
  };

  // submit form 
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("LoginForm handleFormSubit starting ...  with formState ", formState); 

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {  // from Act 26
      console.log("LoginForm handleFormSubit calling login-LOGIN_USER with formState ", formState); 
      // This line seems to call useMutation(LOGIN_USER)  
      const { data } = await login({variables: { ...formState },});
      console.log("LoginForm handleFormSubit returned form login-LOGIN_USER with data ", data); 
      Auth.login(data.login.token);
    } catch (e) {
      console.log("LoginForm handleFormSubit err after login-LOGIN_USER "); 
      console.error(e);
      setShowAlert(true);
    }  // end try-catch

    /* // old from REST starter code 
    try { 
      console.log("LoginForm handleFormSubit calling LOGIN_USER with userFormData ", userFormData); 
      const response = await loginUser(userFormData);
      console.log("LoginForm handleFormSubit got LOGIN_USER response: ", response); 
      if (!response.ok) {
        throw new Error('something went wrong!');
      }
      const { token, user } = await response.json();
      console.log(user);
      Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    } // end try-catch */ 

    setFormState({
      // username: '',
      email: '',
      password: '',
    }); // end setFormState 
  }; // end handleFormSubmit

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={formState.email}
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
            value={formState.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(formState.email && formState.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );  // end return html-react 
};  // end login-form

export default LoginForm;
