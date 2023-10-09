import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function EmployeeAttendance({name}) {
  const [attendanceData, setAttendanceData] = useState([]);

  // Replace 'your-username' with the actual username you want to fetch attendance for
  const username = name;

  useEffect(() => {
    // Fetch data from the API for the specific username
    fetch(`http://localhost:5000/attendance`)
      .then((response) => response.json())
      .then((data) => {
        setAttendanceData(data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, [username]);

  // filter user
  const FilteredAttendance = attendanceData.filter((attendance) => attendance.username === name);

  // Function to format time
  const formatTime = (isoTimeString) => {
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    return new Date(isoTimeString).toLocaleTimeString(undefined, options);
  };

  // Function to format date
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  }

  return (
    <div>
      <h2>Attendance for {username}</h2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Clock In Time</TableCell>
              <TableCell>Clock Out Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {FilteredAttendance.map((attendance) => (
              <TableRow key={attendance._id}>
                <TableCell>{formatDate(attendance.clockInTime)}</TableCell>
                <TableCell>{formatTime(attendance.clockInTime)}</TableCell>
                <TableCell>{attendance.clockOutTime ? formatTime(attendance.clockOutTime) : 'N/A'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default EmployeeAttendance;