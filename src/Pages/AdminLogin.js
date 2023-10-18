import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/adminLogin.css';
import Logo from '../Images/logo.png';
import { useAuth } from '../AuthContext';

function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function from the AuthContext
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
        
        // Call the login function from the AuthContext to set isAuthenticated to true
        login();

        // Store the name and role in localStorage
        localStorage.setItem('adminName', data.name);
        localStorage.setItem('adminRole', data.role);

        // Redirect to the dashboard
        navigate('/admindash', { replace: true });
      } else {
        console.error('Authentication failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center abc" style={{ minHeight: '100vh'}}>
      
        <div className="p-5 login-box">
          <div className='d-flex align-items-center flex-column login-box-txt'>
            <img src={Logo} alt='logo' style={{ width: '130px' }}/>
            <h2 className="text-center mb-4 mt-2" style={{ color: '#183a6d', fontSize: '24px' }}>Welcome Admin</h2>
            <p className='text-center' style={{ fontSize: '12px', color: 'gray' }}>Enter your credentials to access your account</p>
          </div>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                className='mt-3'
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button className='mt-3' style={{ width: '100%' }} variant="primary" type="submit" block>
              Sign In
            </Button>
          </Form>
        </div>
     
    </div>
  );
}

export default AdminLogin;