import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';

import Auth from '../utils/auth';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState(""); 
 
  useEffect(() => {  
    console.log("Navbar loggedIn: ", Auth.loggedIn())
    if (!Auth.loggedIn()) return;  
    const prof = Auth.getProfile(); 
    // let username = "";
    if (!prof) {
      return; 
      // username = prof.data.username;   
      // console.log("Navbar profile.data.username: ", username);   
    } 
    setUsername(prof.data.username); 
  }, [])

  return (
    <>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container fluid>
          <Navbar.Brand as={Link} to='/'>
            Historical Coal Camp Violence Site 
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar' className='d-flex flex-row-reverse'>
            <Nav className='ml-auto d-flex'>
              <Nav.Link as={Link} to='/'>
                Search
              </Nav.Link>
              {/* if user is logged in show saved books and logout */}
              {/* see Search books for embedded variable alt={`The cover for ${book.title}`} */ }
              {/* Authors: {book.authors} */ }
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to='/favorites'>
                    Favorites
                  </Nav.Link>
                  <Nav.Link as={Link} to='/myFights'>
                    Your Incidents
                  </Nav.Link>
                  <Nav.Link as={Link} to='/newFightForm'>
                    New Incident Form
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout}> Logout {username}  </Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* set modal data up */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;
