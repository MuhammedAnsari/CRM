import React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function ComposeModal({ users }) {
  const [open, setOpen] = React.useState(false);
  const [subject, setSubject] = React.useState('');
  const [message, setMessage] = React.useState('');

  // Store the selected user's name directly in a variable
  let selectedUserName = '';

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCompose = () => {
    // Use the selectedUserName variable to get the name
    console.log('To:', selectedUserName);
    console.log('Subject:', subject);
    console.log('Message:', message);

    // Close the modal
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Compose
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <h2>Compose Mail</h2>
          <FormControl fullWidth>
            <InputLabel htmlFor="to">To</InputLabel>
            <Select
              labelId="to"
              id="to"
              label="To"
              onChange={(e) => {
                selectedUserName = e.target.value; // Store the selected user's name
              }}
            >
              {users.map((user) => (
                <MenuItem key={user._id} value={user.name}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <TextField
            fullWidth
            label="Message"
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleCompose}>
            Send
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default ComposeModal;
