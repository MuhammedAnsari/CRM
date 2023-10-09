import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminLogin from './Pages/AdminLogin';
import EmployeeLogin from './Pages/EmployeeLogin';
import AdminDash from './Pages/AdminDash';
import EmployeeDash from './Pages/EmployeeDash';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<EmployeeLogin />} />
            <Route path='/admin' element={<AdminLogin />} />
            <Route path="/admindash" element={<AdminDash />} />
            <Route path='/employeedash' element={<EmployeeDash />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
