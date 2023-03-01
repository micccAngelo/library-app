import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Appbar = ({ isLoggedIn, handleLogout }) => {
  const [displayName, setDisplayName] = useState('');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem('username');
    setDisplayName(username);
  }, []);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    handleLogout();
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

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
            <Button onClick={handleLogoutClick} variant='outline-light'>
              Logout
            </Button>
            <Modal show={showLogoutModal} onHide={handleLogoutCancel}>
              <Modal.Header closeButton>
                <Modal.Title>Confirm Logout</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure you want to log out?</Modal.Body>
              <Modal.Footer>
                <Button variant='secondary' onClick={handleLogoutCancel}>
                  Cancel
                </Button>
                <Button variant='primary' href="/" onClick={handleLogoutConfirm}>
                  Logout
                </Button>
              </Modal.Footer>
            </Modal>
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
