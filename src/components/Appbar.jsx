import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

const Appbar = ({ isLoggedIn, handleLogout }) => {
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    const username = localStorage.getItem('username');
    setDisplayName(username);
  }, []);

  return (
    <Navbar bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand>Library App</Navbar.Brand>
        <Nav className='me-auto'>
          <Nav.Link href='/book'>ListBook</Nav.Link>
          <Nav.Link href='/cart'>ListCart</Nav.Link>
        </Nav>
        {isLoggedIn ? (
          <Nav className='justify-content-end'>
            <Navbar.Text className='me-3'>
              Logged in as: <strong>{displayName}</strong>
            </Navbar.Text>
            <Button onClick={handleLogout} variant='outline-light'>
              Logout
            </Button>
          </Nav>
        ) : (
          <Nav className='justify-content-end'>
            <Button href='/' variant='outline-light'>
              Login
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default Appbar;
