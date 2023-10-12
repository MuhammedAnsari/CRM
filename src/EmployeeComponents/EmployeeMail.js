import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import '../Styles/employee.css';

function EmployeeMailBox({ toUser, subject, onClick }) {
  return (
    <Card className='employee-message-box' onClick={onClick}>
      <CardContent>
        <Typography variant="h6">{toUser}</Typography>
        <Typography variant="subtitle1">{subject}</Typography>
      </CardContent>
    </Card>
  );
}

function EmployeeMailPopup({ message, open, onClose }) {
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

function EmployeeMailSection({name}) {
  const [open, setOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [employeeMails, setEmployeeMails] = useState([]);

  useEffect(() => {
    // Fetch employee mails using the appropriate endpoint
    fetch('http://localhost:5000/fetchmail') // Adjust the endpoint as needed
      .then((response) => response.json())
      .then((data) => {
        setEmployeeMails(data.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const filteredMail = employeeMails.filter((mail) => mail.toUser === name);

  const handleOpen = (message) => {
    setSelectedMessage(message);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMessage(null);
  };

  return (
    <div className='employee-mail-section'>
      <h2>Messages</h2>
      {filteredMail.map((message) => (
        <EmployeeMailBox
          key={message._id}
          toUser={message.toUser}
          subject={message.subject}
          onClick={() => handleOpen(message)}
        />
      ))}
      {selectedMessage && (
        <EmployeeMailPopup
          message={selectedMessage}
          open={open}
          onClose={handleClose}
        />
      )}
    </div>
  );
}

export default EmployeeMailSection;
