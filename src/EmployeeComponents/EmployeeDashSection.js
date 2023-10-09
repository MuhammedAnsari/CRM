import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:5000');

function EmployeeDashSection({ name, uid }) {
  const [clockedIn, setClockedIn] = useState(() => {
    const storedStatus = localStorage.getItem('clockedIn');
    return storedStatus === 'true';
  });
  const [clockInTime, setClockInTime] = useState(() => {
    const storedTime = localStorage.getItem('clockInTime');
    return storedTime ? new Date(storedTime) : null;
  });
  const [clockOutTime, setClockOutTime] = useState(() => {
    const storedTime = localStorage.getItem('clockOutTime');
    return storedTime ? new Date(storedTime) : null;
  });

  useEffect(() => {
    socket.on(`updateClockIn_${uid}`, (data) => {
      if (data.username === name) {
        setClockInTime(new Date(data.clockInTime));
        setClockedIn(true);
        localStorage.setItem('clockedIn', 'true');
        localStorage.setItem('clockInTime', data.clockInTime);
      }
    });

    socket.on(`updateClockOut_${uid}`, (data) => {
      if (data.username === name) {
        setClockOutTime(new Date(data.clockOutTime));
        setClockedIn(false);
        localStorage.setItem('clockedIn', 'false');
        localStorage.setItem('clockOutTime', data.clockOutTime);
      }
    });

    return () => {
      socket.off(`updateClockIn_${uid}`);
      socket.off(`updateClockOut_${uid}`);
    };
  }, [name, uid]);

  const handleClockInOut = () => {
    if (clockedIn) {
      axios.post('http://localhost:5000/clock-out', { username: name, uid: uid }) // Pass UID to the server
        .then((response) => {
          const { data } = response;
          setClockOutTime(new Date(data.clockOutTime));
          setClockedIn(false);
          localStorage.setItem('clockedIn', 'false');
          localStorage.setItem('clockOutTime', data.clockOutTime);
          console.log(uid);
        })
        .catch((error) => {
          console.error('Error clocking out:', error);
        });
    } else {
      axios.post('http://localhost:5000/clock-in', { username: name, uid: uid }) // Pass UID to the server
        .then((response) => {
          const { data } = response;
          setClockInTime(new Date(data.clockInTime));
          setClockedIn(true);
          localStorage.setItem('clockedIn', 'true');
          localStorage.setItem('clockInTime', data.clockInTime);
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
        <p>
          Clock In Time: {formatTime(clockInTime)}
        </p>
      )}
      {clockOutTime && (
        <p>
          Clock Out Time: {formatTime(clockOutTime)}
        </p>
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
