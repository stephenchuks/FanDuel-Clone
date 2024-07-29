import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/users/register/', {
                email,
                first_name: firstName,
                last_name: lastName,
                password,
            });
            setMessage('Registration successful!');
            navigate('/login');
        } catch (error) {
            console.error('Registration error:', error.response);
            if (error.response && error.response.data) {
                setMessage(`Registration failed: ${JSON.stringify(error.response.data)}`);
            } else {
                setMessage('Registration failed: An unknown error occurred.');
            }
        }
    };

    return (
        <div>
            <h2>Register</h2>
            {message && <Alert variant="info">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                    Register
                </Button>
            </Form>
        </div>
    );
};

export default Register;
