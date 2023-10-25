import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import NotificationsIcon from '@mui/icons-material/Notifications';
import axios from 'axios'; 
import '../Styles/admin.css';
import DashboardSection from '../AdminComponents/DashboardSection';
import ManageUsersSection from '../AdminComponents/ManageUsersSection';
import Roles from '../AdminComponents/Roles';
import ManageAdmin from '../AdminComponents/ManageAdmin';
import AdminLeads from '../AdminComponents/AdminLeads';
import AttendanceReport from '../AdminComponents/AttendanceReport';
import AdminMessage from '../AdminComponents/AdminMessage';
import ManageClients from '../AdminComponents/ManageClients';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfilePic from '../Images/profile_pic.jpg';
import io from 'socket.io-client';
import Logo from '../Images/logo.png';

function AdminDash() {
  const navigate = useNavigate();
  const name = localStorage.getItem('adminName');
  const role = localStorage.getItem('adminRole');

  // State to track the current section, notification anchor, and notifications
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [notifications, setNotifications] = useState([]);

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('adminName');
    localStorage.removeItem('adminRole');
    navigate('/admin', { replace: true });
  };

  // Function to open the notification dropdown
const openNotifications = (event) => {
  setNotificationAnchor(event.currentTarget);
  fetchNotifications(); // Fetch notifications when the button is clicked
};


  // Function to close the notification dropdown
  const closeNotifications = () => {
    setNotificationAnchor(null);
  };

  // Function to fetch notifications from the API
  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:5000/view-request');
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  // Fetch notifications when the component mounts
  useEffect(() => {
    // Establish a WebSocket connection
    const socket = io('http://localhost:5000');

    // Listen for incoming WebSocket messages
    socket.on('notification', (notificationData) => {
      // Update your component's state with the new notification
      setNotifications((prevNotifications) => [...prevNotifications, notificationData]);
    });

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  const setCurrentSectionAndHighlightButton = (section) => {
    setCurrentSection(section);
  };

  return (
    <div>
      <div className="admin-container">
        <div className="admin-sidebar">
          <img src={Logo} alt='logo' style={{ width: '200px' }}/>
          <div className="admin-sidebar-options">
            <button
              className={`admin-sidebar-button ${currentSection === 'dashboard' ? 'selected' : ''}`}
              onClick={() => setCurrentSectionAndHighlightButton('dashboard')}
            >
              <div><i className="fa-solid fa-gauge-high"></i> Dashboard</div>
            </button>
            <button
              className={`admin-sidebar-button ${currentSection === 'manageUsers' ? 'selected' : ''}`}
              onClick={() => setCurrentSectionAndHighlightButton('manageUsers')}
            >
              <div><i className="fa-solid fa-users"></i> Manage Users</div>
            </button>
            <button
              className={`admin-sidebar-button ${currentSection === 'roles' ? 'selected' : ''}`}
              onClick={() => setCurrentSectionAndHighlightButton('roles')}
            >
              <div><i className="fa-solid fa-user-doctor"></i> Roles</div>
            </button>
            <button
              className={`admin-sidebar-button ${currentSection === 'leads' ? 'selected' : ''}`}
              onClick={() => setCurrentSectionAndHighlightButton('leads')}
            >
              <div><i className="fa-solid fa-check"></i> Leads</div>
            </button>
            <button
              className={`admin-sidebar-button ${currentSection === 'clients' ? 'selected' : ''}`}
              onClick={() => setCurrentSectionAndHighlightButton('clients')}
            >
              <div><i class="fa-solid fa-person-military-pointing"></i> Clients</div>
            </button>
            <button
              className={`admin-sidebar-button ${currentSection === 'attendance_report' ? 'selected' : ''}`}
              onClick={() => setCurrentSectionAndHighlightButton('attendance_report')}
            >
              <div><i className="fa-solid fa-clipboard-user"></i> Attendance Report</div>
            </button>
            {role === 'Superadmin' && (
              <button
                className={`admin-sidebar-button ${currentSection === 'manage_admin' ? 'selected' : ''}`}
                onClick={() => setCurrentSectionAndHighlightButton('manage_admin')}
              >
                <div><i className="fa-solid fa-user-doctor"></i> Manage Admins</div>
              </button>
            )}
            <button
              className={`admin-sidebar-button ${currentSection === 'messages' ? 'selected' : ''}`}
              onClick={() => setCurrentSectionAndHighlightButton('messages')}
            >
              <div><i className="fa-solid fa-bell"></i> Send Notification</div>
            </button>
          </div>
        </div>
        <div className="admin-content">
          <div className="admin-nav">
            <div className="profile_details d-flex align-items-center" style={{ marginRight: '10px' }}>
              <img src={ProfilePic} alt="profile-pic" style={{ width: '35px', marginRight: '10px', borderRadius: '20px' }}/>
              <span style={{ marginRight: '10px' }}>{name}</span>
            </div>
            <Button className="btn_normal" style={{ width: '30px', borderRadius: '10px', marginRight: '10px' }} onClick={openNotifications}>
              <NotificationsIcon />
            </Button>
            <Button className="btn_normal" style={{ width: '35px' }} onClick={handleLogout}>
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </Button>
          </div>
          <Popover
            open={Boolean(notificationAnchor)}
            anchorEl={notificationAnchor}
            onClose={closeNotifications}
          >
            <Typography variant="h6" sx={{ p: 2 }}>
              Notifications
            </Typography>
            <List>
              {notifications.map((notification, index) => (
                <ListItem key={notification._id}>
                  <ListItemIcon>
                    <NotificationsIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`${notification.assignedUser} requested for more days for "${notification.title}" lead. Actual deadline is ${notification.deadlineDays} days.`}
                  />
                </ListItem>
              ))}
            </List>
          </Popover>
          <hr />
          {currentSection === 'dashboard' && <DashboardSection name={name} />}
          {currentSection === 'manageUsers' && <ManageUsersSection />}
          {currentSection === 'roles' && <Roles />}
          {currentSection === 'clients' && <ManageClients />}
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
