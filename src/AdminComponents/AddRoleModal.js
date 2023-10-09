import React, { useState } from 'react';
import { Modal, TextField, Button } from '@mui/material';
import axios from 'axios';

function AddRoleModal({ open, onClose }) {
  const [newRole, setNewRole] = useState('');

  const handleAddRole = () => {
    // Send a POST request to your server to add the new role
    axios.post('http://localhost:5000/add-role', { rolename: newRole })
      .then((response) => {
        // Handle success, for example, close the modal
        onClose();
        // You can also update the roles list on success if needed
      })
      .catch((error) => {
        console.error('Error adding role:', error);
      });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ padding: '16px', width: '300px', backgroundColor: 'white' }}>
        <h2>Add New Role</h2>
        <TextField
          label="New Role Name"
          variant="outlined"
          fullWidth
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: '16px' }}
          onClick={handleAddRole}
        >
          Add Role
        </Button>
      </div>
    </Modal>
  );
}

export default AddRoleModal;
