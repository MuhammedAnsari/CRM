import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import AddRoleModal from '../AdminComponents/AddRoleModal';

function Roles() {
  const [roles, setRoles] = useState([]);
  const [openModal, setOpenModal] = useState(false);

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

  return (
    <div>
      <h2>Manage Roles</h2>
      <Button variant="contained" color="primary" onClick={handleOpenModal}>
        Add Role
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Role Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role._id}>
                <TableCell>{role.rolename}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleEditRole(role._id)}>Edit</Button>
                  <Button variant="contained" color="secondary" onClick={() => handleRemoveRole(role._id)}>Remove</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddRoleModal open={openModal} onClose={handleCloseModal} />
    </div>
  );
}

export default Roles;
