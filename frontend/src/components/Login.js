import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };

    try {
      const res = await axiosInstance.post('users/login/', user);
      console.log(res.data);
      setMessage('Login successful!');
      navigate('/');
    } catch (err) {
      console.error(err.response.data);
      setMessage('Login failed: ' + err.response.data.detail);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
