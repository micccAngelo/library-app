import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import '../styles/LoginForm.css';

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/perpustakaan/api/v1/user/login`,
        { email, password }
      );

      localStorage.setItem('user_id', response.data.data.user_id);
      localStorage.setItem('username', response.data.data.username);
      onLogin(response.data.data.user_id);
      setUsername(response.data.data.username);
      setShowSuccess(true);
      setEmail('');
      setPassword('');
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/');
      }, 2000);

    } catch (error) {
      console.log(error)
      setError('Invalid email or password');
      setShowSuccess(false);
    }
  };

  return (
    <div className='Forms'>
      <Card className='Form' style={{ width: '40%' }}>
        <h1 className='title'>Login</h1>
        <Form onSubmit={handleSubmit} >
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password" />
          </Form.Group>
          {error && <div>{error}</div>}
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Modal show={showSuccess} onHide={() => setShowSuccess(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Success!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Hello {username}!
            </Modal.Body>
          </Modal>
        </Form>
      </Card>
    </div>
  );
}

export default LoginForm;
