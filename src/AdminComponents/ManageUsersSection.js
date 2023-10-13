import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal'; 
import TextField from '@mui/material/TextField'; 
import axios from 'axios';
import UserProfile from '../Images/user_profile.jpg'

function ManageUsersSection() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [roles, setRoles] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  useEffect(() => {
    // Fetch user details from your API
    axios.get('http://localhost:5000/employees')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
      });

      fetch('http://localhost:5000/roles')
      .then((response) => response.json())
      .then((data) => {
        setRoles(data);
      })
      .catch((error) => {
        console.error('Error fetching roles:', error);
      });
  }, []);

  const openEditModal = (user) => {
    setEditUser(user);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditUser(null);
    setIsEditModalOpen(false);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };


  const handleAddEmployee = async () => {
    try {
      // Make a POST request to add a new employee
      const response = await axios.post('http://localhost:5000/insert-employee', newEmployee);

      if (response.status === 201) {
        console.log('Employee added successfully:', response.data);
        // Clear the input fields after adding
        setNewEmployee({
          name: '',
          email: '',
          password: '',
          role: '',
        });
      } else {
        console.error('Error adding employee:', response.data);
      }
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleEditUser = async () => {
    try {
      // Make a PUT request to update the employee's details
      const response = await axios.put(`http://localhost:5000/update-employee/${editUser._id}`, editUser);
  
      if (response.status === 200) {
        
        console.log('Employee details updated:', response.data);
      } else {
        
        console.error('Error updating employee details:', response.data);
      }
    } catch (error) {
      console.error('Error updating employee details:', error);
    }
  
    closeEditModal();
  };
  

  return (
    <div>
      <div className='d-flex justify-content-between'>
        <h2>Employees</h2>
        <Button className="shadow-button" style={{ color: 'gray' }} onClick={openAddModal}>
        <i class="fa-solid fa-user-plus"></i>
        </Button>
      </div>
      <TableContainer className='mt-3' component={Paper}>
        <Table aria-label="User Details Table">
          <TableHead>
            <TableRow>
              <TableCell style={{ color: 'gray' }}>Name</TableCell>
              <TableCell style={{ color: 'gray' }}>Email</TableCell>
              <TableCell style={{ color: 'gray' }}>Role</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell><img src={UserProfile} alt='profile' style={{ width: '35px', height: '35px', borderRadius: '100%' }}/> {user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button style={{ color: 'gray' }} onClick={() => openEditModal(user)}>
                    <i class="fa-solid fa-gear"></i>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit User Modal */}
      <Modal open={isEditModalOpen} onClose={closeEditModal}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '300px', backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
        <h2>Edit User</h2>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={editUser?.name || ''}
          onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
          style={{ marginBottom: '16px' }}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={editUser?.email || ''}
          onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
          style={{ marginBottom: '16px' }}
        />
        <div>
          <label>Role</label>
          <select
            value={editUser?.role || ''}
            onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
            style={{ width: '100%', padding: '8px', marginBottom: '16px' }}
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role._id} value={role.rolename}>
                {role.rolename}
              </option>
            ))}
          </select>
        </div>
        <Button variant="contained" color="primary" onClick={closeEditModal}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleEditUser}>
          Save
        </Button>
      </div>
    </Modal>

    {/* Add Employee Modal */}
    <Modal open={isAddModalOpen} onClose={closeAddModal}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '300px', backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
          <span>Add Employee</span>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={newEmployee.name}
            onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
            style={{ marginTop:'10px', marginBottom: '16px' }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={newEmployee.email}
            onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
            style={{ marginBottom: '16px' }}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            value={newEmployee.password}
            onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
            style={{ marginBottom: '16px' }}
          />
          <div>
            <label style={{ color: 'gray' }}>Role</label>
            <select 
              className='mt-2'
              value={newEmployee.role}
              onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
              style={{ width: '100%', padding: '8px', marginBottom: '16px', border: 'none' }}
            >
              <option  value=""><p style={{ color: 'gray' }}>Select Role</p></option>
              {roles.map((role) => (
                <option key={role._id} value={role.rolename}>
                  {role.rolename}
                </option>
              ))}
            </select>
          </div>
          <div className='d-flex justify-content-around'>
            <Button className='shadow-button' style={{ color: 'green'}} onClick={handleAddEmployee}>
              <i class="fa-solid fa-check"></i>
            </Button>
            <Button className='shadow-button' style={{ color: 'red'}} onClick={closeAddModal}>
              <i class="fa-solid fa-x"></i>
            </Button>
          </div>        
        </div>
      </Modal>
    </div>
  );
}

export default ManageUsersSection;
