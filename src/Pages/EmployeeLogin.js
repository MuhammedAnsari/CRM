import React, { useState } from 'react';
import { Container, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function EmployeeLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
 
    try {
      console.log('Attempting employee login...');
      const response = await fetch('http://localhost:5000/employee-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('Response:', response);

      // After successful login
      if (response.ok) {
        const data = await response.json();

        // Store role and name in localStorage
        localStorage.setItem('userRole', data.role);
        localStorage.setItem('userName', data.name);

        // Redirect to the dashboard
        navigate('/employeedash', { replace: true });
      }
      else {
        console.error('Employee login failed');
      }
    } catch (error) {
      console.error('Error during employee login:', error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Col md={6}>
        <div className="p-4 border rounded shadow">
          <h2 className="text-center mb-4">Employee Login</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

export default EmployeeLogin;
