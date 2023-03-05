import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Buttons from '../ReusableComponents/Buttons';
import Modals from '../ReusableComponents/Modals'

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
    localStorage.removeItem('user_id')
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
            <Buttons variant='outline-light' label='Logout' onClick={handleLogoutClick}/>
            <Modals
              show={showLogoutModal}
              title="Confirm Logout"
              message="Are you sure you want to log out?"
              primaryButtonLabel="Logout"
              primaryButtonVariant="primary"
              onPrimaryButtonClick={handleLogoutConfirm}
              secondaryButtonLabel="Cancel"
              secondaryButtonVariant="secondary"
              onSecondaryButtonClick={handleLogoutCancel}
            />
          </Nav>
        ) : (
          <Nav className='justify-content-end'>
            <Buttons variant='outline-light' label='Login' onClick={handleLogoutClick} href={'/login'}/>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default Appbar;
