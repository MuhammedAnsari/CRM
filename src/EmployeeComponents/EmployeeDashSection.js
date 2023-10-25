import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:5000');

function EmployeeDashSection({ name, uid }) {
  const [clockedIn, setClockedIn] = useState(false);

  const [clockInTime, setClockInTime] = useState(null);
  const [clockOutTime, setClockOutTime] = useState(null);

  useEffect(() => {
    // Fetch employee status from the server when the component mounts
    axios.get(`http://localhost:5000/employees/${name}`)
      .then((response) => {
        const { data } = response;
        setClockedIn(data.status);
      })
      .catch((error) => {
        console.error('Error fetching employee status:', error);
      });

    socket.on(`updateClockIn_${name}`, (data) => {
      if (data.username === name) {
        setClockInTime(new Date(data.clockInTime));
        setClockedIn(true);
      }
    });

    socket.on(`updateClockOut_${name}`, (data) => {
      if (data.username === name) {
        setClockOutTime(new Date(data.clockOutTime));
        setClockedIn(false);
      }
    });

    return () => {
      socket.off(`updateClockIn_${name}`);
      socket.off(`updateClockOut_${name}`);
    };
  }, [name]);

  const handleClockInOut = () => {
    if (clockedIn) {
      axios.post('http://localhost:5000/clock-out', { username: name, uid })
        .then((response) => {
          const { data } = response;
          setClockOutTime(new Date(data.clockOutTime));
          setClockedIn(false);
        })
        .catch((error) => {
          console.error('Error clocking out:', error);
        });
    } else {
      axios.post('http://localhost:5000/clock-in', { username: name, uid })
        .then((response) => {
          const { data } = response;
          setClockInTime(new Date(data.clockInTime));
          setClockedIn(true);
        })
        .catch((error) => {
          console.error('Error clocking in:', error);
        });
    }
  };

  return (
    <div>
      <h2>Welcome {name}</h2>
      <Button
        variant="contained"
        onClick={handleClockInOut}
        style={{
          backgroundColor: clockedIn ? 'red' : 'green',
          color: 'white',
          borderRadius: '5px',
        }}
      >
        {clockedIn ? 'Clock Out' : 'Clock In'}
      </Button>
      {clockInTime && (
        <p>Clock In Time: {formatTime(clockInTime)}</p>
      )}
      {clockOutTime && (
        <p>Clock Out Time: {formatTime(clockOutTime)}</p>
      )}
    </div>
  );
}

const formatTime = (time) => {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };
  return time.toLocaleString(undefined, options);
};

export default EmployeeDashSection;
