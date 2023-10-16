// Roles.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Modal, TextField } from '@mui/material';
import '../Styles/admin.css'

function Roles() {
  const [roles, setRoles] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    // Fetch roles from API
    axios.get('http://localhost:5000/roles')
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => {
        console.error('Error fetching roles:', error);
      });
  }, []);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleEditRole = (roleId) => {
    // Implement your edit role logic here
    console.log(`Editing role with ID: ${roleId}`);
  };

  const handleRemoveRole = (roleId) => {
    // Implement your remove role logic here
    console.log(`Removing role with ID: ${roleId}`);
  };

  const handleAddRole = () => {
    // Send a POST request to your server to add the new role
    axios.post('http://localhost:5000/add-role', { rolename: newRole })
      .then((response) => {
        // Handle success, for example, close the modal
        handleCloseModal();
        // You can also update the roles list on success if needed
      })
      .catch((error) => {
        console.error('Error adding role:', error);
      });
  };



  return (
    <div>
      <div className='d-flex justify-content-between'>
        <h2>Roles</h2>
        <Button className="shadow-button" style={{ color: 'gray' }} onClick={handleOpenModal}>
          <i className="fa-solid fa-person-circle-plus fa-2x"></i>
        </Button>
      </div>
      <TableContainer className='mt-3' component={Paper}>
        <Table>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role._id}>
                <TableCell>{role.rolename}</TableCell>
                <TableCell>
                  <Button style={{ color: 'gray' }} onClick={() => handleEditRole(role._id)}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Button>
                  <Button style={{ color: 'gray' }} onClick={() => handleRemoveRole(role._id)}>
                    <i className="fa-solid fa-trash"></i>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add role Modal */}
      <div className='modal_parent'>
        <Modal className='add_role_modal' open={openModal} onClose={handleCloseModal}>
          <div style={{ padding: '16px', width: '300px', backgroundColor: 'white' }}>
            <p>Add New Role</p>
            <TextField
              label="New Role Name"
              variant="outlined"
              fullWidth
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
            />
            <div className='d-flex justify-content-around mt-2'>
              <Button onClick={handleAddRole} style={{ color: 'green'}}>
                <i class="fa-solid fa-check"></i>
              </Button>
              <Button onClick={handleCloseModal} style={{ color: 'red'}}>
                <i class="fa-solid fa-x"></i>
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Roles;
