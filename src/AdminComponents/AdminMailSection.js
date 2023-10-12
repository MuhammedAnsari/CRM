import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import '../Styles/admin.css';

function MessageBox({ toUser, subject, onClick }) {
  return (
    <div className='message-box' onClick={onClick}>
      <Typography variant="h6">{toUser}</Typography>
      <Typography variant="subtitle1">{subject}</Typography>
    </div>
  );
}

function MessagePopup({ message, open, onClose }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', p: 4, maxWidth: 400 }}>
        <Typography variant="h6">{message.toUser}</Typography>
        <Typography variant="subtitle1">{message.subject}</Typography>
        <Typography>{message.message}</Typography>
      </Box>
    </Modal>
  );
}

function AdminMailSection() {
  const [open, setOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [viewmail, setViewmail] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/fetchmail')
      .then((response) => response.json())
      .then((data) => {
        setViewmail(data.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const handleOpen = (message) => {
    setSelectedMessage(message);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMessage(null);
  };

  return (
    <div className='mail_section'>
      {viewmail.map((message) => (
        <MessageBox
          key={message._id}
          toUser={message.toUser}
          subject={message.subject}
          onClick={() => handleOpen(message)}
        />
      ))}
      {selectedMessage && (
        <MessagePopup
          message={selectedMessage}
          open={open}
          onClose={handleClose}
        />
      )}
    </div>
  );
}

export default AdminMailSection;
