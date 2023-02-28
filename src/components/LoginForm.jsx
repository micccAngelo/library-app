import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import '../styles/LoginForm.css';

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/perpustakaan/api/v1/user/login`,
        { email, password }
      );

      localStorage.setItem('userId', response.data.userId);
      onLogin(response.data.userId);
      setSuccess(true);
      

    } catch (error) {
      console.log(error)
      setError('Invalid email or password');
      setSuccess(false);
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
          {success && <Alert variant='success' className='mt-3'>Successfully logged in!</Alert>}
        </Form>
      </Card>
    </div>
  );
}

export default LoginForm;
