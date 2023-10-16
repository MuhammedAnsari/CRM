import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import DatePicker from '@mui/lab/DatePicker';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Input } from '@mui/material';

function AdminLeads() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: null,
    selectedUser: '',
    deadlineDays: '', 
    status: 'Assigned', 
  });
  const [users, setUsers] = useState([]); // State to store user data fetched from the API
  const [leads, setLeads] = useState([]); // State to store leads data fetched from the API

  const [editLeadId, setEditLeadId] = useState(null);
  const [editedLeadData, setEditedLeadData] = useState({
    title: '',
    description: '',
    date: null,
    selectedUser: '',
    deadlineDays: '',
    status: 'Assigned', // Default status
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };


  useEffect(() => {
    // Fetch user data from the API when the component mounts
    fetchUsers();

    // Fetch leads data from the API when the component mounts
    fetchLeads();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/employees');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error('Error fetching users:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchLeads = async () => {
    try {
      const response = await fetch('http://localhost:5000/leads');
      if (response.ok) {
        const data = await response.json();
        setLeads(data);
      } else {
        console.error('Error fetching leads:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      date: date,
    });
  };

  const handleUserChange = (e) => {
    setFormData({
      ...formData,
      selectedUser: e.target.value,
    });
  };

  const handleCloseEdit = () => {
    setEditLeadId(null);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditedLeadData({
      ...editedLeadData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      // Create a new FormData object
      const formDataObj = new FormData();

      // Append the selected file to the FormData if a file is selected
      if (selectedFile) {
        formDataObj.append('file', selectedFile);
      }

      // Append other form fields to the FormData
      formDataObj.append('title', formData.title);
      formDataObj.append('description', formData.description);
      formDataObj.append('date', formData.date);
      formDataObj.append('selectedUser', formData.selectedUser);
      formDataObj.append('deadlineDays', formData.deadlineDays);
      formDataObj.append('status', formData.status);

      // Send a POST request to save the lead in the database along with the file (if selected)
      const response = await fetch('http://localhost:5000/insert-lead', {
        method: 'POST',
        body: formDataObj, // Use the FormData object as the request body
      });

      if (response.ok) {
        console.log('Lead saved successfully');
        // Refresh the leads list
        fetchLeads();
      } else {
        console.error('Error saving lead:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving lead:', error);
    }

    setOpen(false);
  };



  const handleEditLead = (leadId) => {
    // Find the lead in the leads array by ID
    const leadToEdit = leads.find((lead) => lead._id === leadId);

    // Set the editLeadId state to the ID of the lead to be edited
    setEditLeadId(leadId);

    // Set the editedLeadData state with the lead's existing data
    setEditedLeadData({
      title: leadToEdit.title,
      description: leadToEdit.description,
      date: leadToEdit.date,
      selectedUser: leadToEdit.selectedUser,
      deadlineDays: leadToEdit.deadlineDays,
      status: leadToEdit.status, // Include the status field
    });

    // Open the edit dialog or form (you can implement this part later)
  };

  const handleSaveEdit = async () => {
    try {
      // Fetch the selected user's name based on the ID
      const selectedUser = users.find((user) => user._id === editedLeadData.selectedUser);

      // Create an updated lead object with the selected user's name and other fields
      const updatedLead = {
        title: editedLeadData.title,
        description: editedLeadData.description,
        assignedUser: selectedUser ? selectedUser.name : '', // Include assignedUser field
        deadlineDays: editedLeadData.deadlineDays, // Deadline (days)
        status: editedLeadData.status, // Include the status field
      };

      // Send a PUT request to update the lead in the database
      const response = await fetch(`http://localhost:5000/update-lead/${editLeadId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedLead),
      });
      console.log('PUT response:', response);

      if (response.ok) {
        console.log('Lead updated successfully');
        // Refresh the leads list
        fetchLeads();
      } else {
        console.error('Error updating lead:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating lead:', error);
    }

    // Close the edit dialog
    setEditLeadId(null);
  };

  const handleDeleteLead = async (leadId) => {
    try {
      // Send a DELETE request to remove the lead from the database
      const response = await fetch(`http://localhost:5000/delete-lead/${leadId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Lead deleted successfully');
        // Refresh the leads list
        fetchLeads();
      } else {
        console.error('Error deleting lead:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  };

  return (
    <div>
      <div className='d-flex justify-content-between'>
        <h2>Leads</h2>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Add Leads
        </Button>
      </div>
      {/* Add Lead Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Leads</DialogTitle>
        <DialogContent>
          <TextField
            name="title"
            label="Title"
            variant="outlined"
            fullWidth
            value={formData.title}
            onChange={handleFormChange}
            margin="normal"
          />
          <TextareaAutosize
            name="description"
            minRows={4}
            placeholder="Description"
            value={formData.description}
            onChange={handleFormChange}
            style={{ width: '100%', marginBottom: '16px', padding: '8px' }}
          />
          <DatePicker
            name="date"
            label="Date"
            value={formData.date}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} variant="outlined" margin="normal" fullWidth />}
          />
          <TextField
            name="deadlineDays"
            label="Deadline (days)"
            type="number"
            variant="outlined"
            fullWidth
            value={formData.deadlineDays}
            onChange={handleFormChange}
            margin="normal"
          />
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel>Select User</InputLabel>
            <Select
              name="selectedUser"
              value={formData.selectedUser}
              onChange={handleUserChange}
              label="Select User"
            >
              {users.map((user) => (
                <MenuItem key={user._id} value={user.name}>
                  {user.name} ({user.role})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleFormChange}
              label="Status"
            >
              <MenuItem value="Assigned">Assigned</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
            <Input
              type="file"
              accept=".pdf, .jpg, .jpeg, .png"
              onChange={handleFileChange}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Lead Dialog */}
      <Dialog open={editLeadId !== null} onClose={handleCloseEdit}>
        <DialogTitle>Edit Lead</DialogTitle>
        <DialogContent>
          {/* Edit lead form */}
          <TextField
            name="title"
            label="Title"
            variant="outlined"
            fullWidth
            value={editedLeadData.title}
            onChange={handleEditFormChange}
            margin="normal"
          />
          <TextareaAutosize
            name="description"
            minRows={4}
            placeholder="Description"
            value={editedLeadData.description}
            onChange={handleEditFormChange}
            style={{ width: '100%', marginBottom: '16px', padding: '8px' }}
          />
          <TextField
            name="deadlineDays"
            label="Deadline (days)"
            type="number"
            variant="outlined"
            fullWidth
            value={editedLeadData.deadlineDays}
            onChange={handleEditFormChange}
            margin="normal"
          />
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel>Select User</InputLabel>
            <Select
              name="selectedUser"
              value={editedLeadData.selectedUser}
              onChange={handleEditFormChange}
              label="Select User"
            >
              {users.map((user) => (
                <MenuItem key={user._id} value={user._id}>
                  {user.name} ({user.role})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={editedLeadData.status}
              onChange={handleEditFormChange}
              label="Status"
            >
              <MenuItem value="Assigned">Assigned</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Leads List */}
      <div className='leads_section_admin'>
        {leads
          .slice() // Create a shallow copy of the array
          .sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt)) // Sort by 'addedAt' in descending order
          .map((lead) => (
            <Card key={lead._id} style={{ marginLeft: '15px' }} variant="outlined" sx={{ maxWidth: 300, marginBottom: '16px' }}>
              <CardContent style={{ width: '300px' }}>
                <Typography variant="h5" component="div">
                  {lead.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Assigned to: {lead.assignedUser}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Deadline (days): {lead.deadlineDays}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Status: {lead.status}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Date Added: {new Date(lead.addedAt).toLocaleDateString('en-GB')}
                </Typography>

                <IconButton onClick={() => handleEditLead(lead._id)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteLead(lead._id)}>
                  <DeleteIcon />
                </IconButton>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}

export default AdminLeads;