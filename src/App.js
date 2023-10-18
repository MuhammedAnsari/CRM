import React from 'react';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AdminLogin from './Pages/AdminLogin';
import EmployeeLogin from './Pages/EmployeeLogin';
import AdminDash from './Pages/AdminDash';
import EmployeeDash from './Pages/EmployeeDash';
import { useAuth } from './AuthContext';

function App() {

  const { isAuthenticated } = useAuth(); 

  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<EmployeeLogin />} />
            <Route path='/admin' element={<AdminLogin />} />
            <Route path="/admindash" element={isAuthenticated ? <AdminDash /> : <Navigate to="/admin" />} />
            <Route path='/employeedash' element={<EmployeeDash />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
