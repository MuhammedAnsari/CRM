import React, { useState } from 'react';
import { Container, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminLogin({ setRole }) { 
  
  const navigate = useNavigate(); 

  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState(''); 

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      console.log('Attempting login...');
      const response = await fetch('http://localhost:5000/admin-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      console.log('Response:', response); 

      if (response.ok) {
        const data = await response.json();
      
        // Pass the role as a URL parameter to the dashboard route
        navigate(`/admindash?role=${data.role}&name=${data.name}`, { replace: true });
      } else {
        console.error('Authentication failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Col md={6}>
        <div className="p-4 border rounded shadow">
          <h2 className="text-center mb-4">Admin Login</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button className='mt-3' variant="primary" type="submit" block>
              Login
            </Button>
          </Form>
        </div>
      </Col>
    </Container>
  );
}

export default AdminLogin;