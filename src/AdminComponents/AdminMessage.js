import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import AdminMailSection from './AdminMailSection';
import '../Styles/admin.css'

function AdminMessage() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [toUser, setToUser] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/employees')
      .then((response) => {
        const userNames = response.data.map(user => user.name);
        setUsers(userNames);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formData = {
    toUser: toUser,
    subject: subject,
    message: message,
  };

  const handleCompose = () => {
    console.log('To:', toUser);
    console.log('Subject:', subject);
    console.log('Message:', message);
    setOpen(false);


    // post request to server
    axios.post('http://localhost:5000/mails', formData)
    .then((response) => {
      console.log('Data saved successfully:', response.data);

      // reset form
      setToUser(''); setSubject(''); setMessage('');
      handleClose(); // Close the modal
    })
    .catch((error) => {
      console.error('Error saving data:', error);
    });

  };

  return (
    <div>
      <div className='d-flex justify-content-between'>
        <h1>Send Notification</h1>
        <Button variant="outlined" color="primary" onClick={handleOpen}>
          Compose
        </Button>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <h2>Compose Mail</h2>
          <FormControl fullWidth>
            <InputLabel htmlFor="to">To</InputLabel>
            <Select
              labelId="to"
              id="to"
              label="To"
              value={toUser}
              onChange={(e) => setToUser(e.target.value)}
            >
              {users.map((userName) => (
                <MenuItem key={userName} value={userName}>
                  {userName}
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

      <div className='mail_section mt-3'>
        <AdminMailSection />
      </div>
    </div>
  );
}

export default AdminMessage;
