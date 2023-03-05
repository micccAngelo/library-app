import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Buttons from '../ReusableComponents/Buttons';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Modals from '../ReusableComponents/Modals';
import LoginAPI from '../APIService/LoginAPI';
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
      const data = await LoginAPI(email, password);
      localStorage.setItem('user_id', data.user_id);
      localStorage.setItem('username', data.username);
      onLogin(data.user_id);
      setUsername(data.username);
      setShowSuccess(true);
      setEmail('');
      setPassword('');
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/book');
      }, 2000);

    } catch (error) {
      console.log(error);
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
          <Buttons variant='primary' label='Submit'type={'submit'} />
          <Modals
            show={showSuccess}
            onHide={() => setShowSuccess(false)}
            title="Success!"
            message={`Hello ${username}!`}
          />
        </Form>
      </Card>
    </div>
  );
}

export default LoginForm;
