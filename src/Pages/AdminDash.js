import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/admin.css';
import DashboardSection from '../AdminComponents/DashboardSection';
import ManageUsersSection from '../AdminComponents/ManageUsersSection';
// import Profile from '../AdminComponents/Profile';
import Roles from '../AdminComponents/Roles';
import ManageAdmin from '../AdminComponents/ManageAdmin';
import AdminLeads from '../AdminComponents/AdminLeads';
import AttendanceReport from '../AdminComponents/AttendanceReport';
import AdminMessage from '../AdminComponents/AdminMessage';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfilePic from '../Images/profile_pic.jpg';

function AdminDash() {
  const navigate = useNavigate();
  const name = localStorage.getItem('adminName');
  const role = localStorage.getItem('adminRole');

  // State to track the current section
  const [currentSection, setCurrentSection] = useState('dashboard');

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('adminName');
    localStorage.removeItem('adminRole');
    navigate('/admin', { replace: true });
  };

  return (
    <div>
      <div className='admin-container'>
        <div className='admin-sidebar'>
          <p className='admin-head'>{role}</p>
          <hr />
          <div className='admin-sidebar-options'>
            {/* Buttons to switch sections */}
            <button onClick={() => setCurrentSection('dashboard')}>
              <i className="fa-solid fa-gauge-high"></i> Dashboard
            </button>
            <button onClick={() => setCurrentSection('manageUsers')}>
              <i className="fa-solid fa-users"></i> Manage Users
            </button>
            {/* <button onClick={() => setCurrentSection('profile')}>
              <i className="fa-regular fa-address-card"></i> Profile
            </button> */}
            <button onClick={() => setCurrentSection('roles')}>
              <i className="fa-solid fa-user-doctor"></i> Roles
            </button>
            <button onClick={() => setCurrentSection('leads')}>
              <i className="fa-solid fa-user-doctor"></i> Leads
            </button>
            <button onClick={() => setCurrentSection('attendance_report')}>
              <i className="fa-solid fa-user-doctor"></i> Attendance Report
            </button>
            {role === 'Superadmin' && (
              <button onClick={() => setCurrentSection('manage_admin')}>
                <i className="fa-solid fa-user-doctor"></i> Manage Admins
              </button>
            )}
            <button onClick={() => setCurrentSection('messages')}>
              <i className="fa-solid fa-user-doctor"></i> Send Notification
            </button>
          </div>
        </div>
        <div className='admin-content'>
          <div className='admin-nav'>
            <div className='profile_details d-flex align-items-center' style={{ marginRight: '10px' }}>
              <img src={ProfilePic} alt='profile-pic' style={{ width: '35px', marginRight: '10px', borderRadius: '20px' }}/>
              <span style={{ marginRight: '10px' }}>{name}</span>
            </div>
            <button className='btn_normal' style={{ width: '30px', borderRadius: '10px', marginRight: '10px' }}><i className="fa-regular fa-bell"></i></button>
            <button className='btn_normal' style={{ width: '35px' }} onClick={handleLogout}><i className="fa-solid fa-arrow-right-from-bracket"></i></button>
          </div>
          <hr />
          {currentSection === 'dashboard' && <DashboardSection name={name} />}
          {currentSection === 'manageUsers' && <ManageUsersSection />}
          {/* {currentSection === 'profile' && <Profile name={name} />} */}
          {currentSection === 'roles' && <Roles />}
          {currentSection === 'manage_admin' && <ManageAdmin />}
          {currentSection === 'leads' && <AdminLeads />}
          {currentSection === 'attendance_report' && <AttendanceReport />}
          {currentSection === 'messages' && <AdminMessage />} 
        </div>
      </div>
    </div>
  );
}

export default AdminDash;
