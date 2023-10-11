import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Styles/admin.css';
import DashboardSection from '../AdminComponents/DashboardSection';
import ManageUsersSection from '../AdminComponents/ManageUsersSection';
import Profile from '../AdminComponents/Profile';
import Roles from '../AdminComponents/Roles';
import ManageAdmin from '../AdminComponents/ManageAdmin';
import AdminLeads from '../AdminComponents/AdminLeads';
import AttendanceReport from '../AdminComponents/AttendanceReport';
import AdminMessage from '../AdminComponents/AdminMessage';

function AdminDash() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const role = searchParams.get('role');
  const name = searchParams.get('name');

  // State to track the current section
  const [currentSection, setCurrentSection] = useState('dashboard');

  // Function to handle logout
  const handleLogout = () => {
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
            <button onClick={() => setCurrentSection('profile')}>
              <i class="fa-regular fa-address-card"></i> Profile
            </button>
            <button onClick={() => setCurrentSection('roles')}>
              <i class="fa-solid fa-user-doctor"></i> Roles
            </button>
            <button onClick={() => setCurrentSection('leads')}>
              <i class="fa-solid fa-user-doctor"></i> Leads
            </button>
            <button onClick={() => setCurrentSection('attendance_report')}>
              <i class="fa-solid fa-user-doctor"></i> Attendance Report
            </button>
            {role === 'Superadmin' && (
              <button onClick={() => setCurrentSection('manage_admin')}>
                <i className="fa-solid fa-user-doctor"></i> Manage Admins
              </button>
            )}
            <button onClick={() => setCurrentSection('messages')}>
              <i class="fa-solid fa-user-doctor"></i> Messages
            </button>
          </div>
        </div>
        <div className='admin-content'>
          <div className='admin-nav'>
            <button onClick={handleLogout}>Logout</button>
            <hr />
          </div>
          {currentSection === 'dashboard' && <DashboardSection name={name} />}
          {currentSection === 'manageUsers' && <ManageUsersSection />}
          {currentSection === 'profile' && <Profile />}
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