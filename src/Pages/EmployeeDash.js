import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/admin.css';
import EmployeeDashSection from '../EmployeeComponents/EmployeeDashSection';
import EmployeeAttendance from '../EmployeeComponents/EmployeeAttendance';
import EmployeeTasks from '../EmployeeComponents/EmployeeTasks';

function Dashboard() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');
  const userName = localStorage.getItem('userName'); // Corrected variable name

  // State to track the current section
  const [currentSection, setCurrentSection] = useState('dashboard');

  // Function to handle logout
  const handleLogout = () => {
    navigate('/', { replace: true });
  };

  return (
    <div>
      <div className='admin-container'>
        <div className='admin-sidebar'>
          <p className='admin-head'>{userRole}</p> {/* Corrected variable name */}
          <hr />
          <div className='admin-sidebar-options'>
            {/* Buttons to switch sections */}
            <button className={currentSection === 'dashboard' ? 'active' : ''} onClick={() => setCurrentSection('dashboard')}>
              <i className="fa-solid fa-gauge-high"></i> Dashboard
            </button>
            <button className={currentSection === 'attendance' ? 'active' : ''} onClick={() => setCurrentSection('attendance')}>
              <i className="fa-solid fa-clipboard-user"></i> Attendance
            </button>
            <button className={currentSection === 'employeetasks' ? 'active' : ''} onClick={() => setCurrentSection('employeetasks')}>
              <i className="fa-solid fa-clipboard-user"></i> My Tasks
            </button>
          </div>
        </div>
        <div className='admin-content'>
          <div className='admin-nav'>
            <button onClick={handleLogout}>Logout</button>
            <hr />
          </div>
          {/* Conditionally render different sections */}
          {currentSection === 'dashboard' && <EmployeeDashSection name={userName} />} 
          {currentSection === 'attendance' && <EmployeeAttendance name={userName} />}
          {currentSection === 'employeetasks' && <EmployeeTasks name={userName} />} 
        </div>
      </div>
    </div>
  );
}

export default Dashboard;