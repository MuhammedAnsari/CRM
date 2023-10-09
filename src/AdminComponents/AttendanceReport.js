import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function AttendanceReport() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [employeeNames, setEmployeeNames] = useState([]); // State to store employee names

  useEffect(() => {
    // Fetch attendance data from the API
    axios.get('http://localhost:5000/attendance')
      .then((response) => {
        setAttendanceData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching attendance data:', error);
      });

    // Fetch employee names from the API
    axios.get('http://localhost:5000/employees')
      .then((response) => {
        // Extract employee names from the response data
        const names = response.data.map((employee) => employee.name);
        setEmployeeNames(names);
      })
      .catch((error) => {
        console.error('Error fetching employee names:', error);
      });
  }, []);

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const filteredAttendanceData = selectedUser
    ? attendanceData.filter((attendance) => attendance.username === selectedUser)
    : attendanceData;

  return (
    <div>
      <h1>Attendance Report</h1>
      <FormControl variant="outlined" style={{ marginBottom: '20px' }}>
        <Select
          value={selectedUser}
          onChange={handleUserChange}
          label="Select User"
        >
          <MenuItem value="">All Users</MenuItem>
          {employeeNames.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TableContainer component={Paper}>
        <Table aria-label="Attendance Table">
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Clock In Time</TableCell>
              <TableCell>Clock Out Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAttendanceData.map((attendance) => (
              <TableRow key={attendance._id}>
                <TableCell>{attendance.username}</TableCell>
                <TableCell>{new Date(attendance.clockInTime).toLocaleString()}</TableCell>
                <TableCell>
                  {attendance.clockOutTime ? new Date(attendance.clockOutTime).toLocaleString() : 'N/A'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AttendanceReport;
