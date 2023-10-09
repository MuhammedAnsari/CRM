import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function ManageAdmin({ role }) {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    // Fetch admins from your MongoDB database using Mongoose
    axios.get('http://localhost:5000/admin') // Use the relative path to your API
      .then((response) => {
        setAdmins(response.data);
      })
      .catch((error) => {
        console.error('Error fetching admins:', error);
      });
  }, []);

  return (
    <div>
      <h2>Manage Admins</h2>
      {/* {admin.role === 'Admin' && ( */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {admins.map((admin, index) => (
                <TableRow key={index}>
                  <TableCell>{admin.name}</TableCell>
                  <TableCell>{admin.username}</TableCell>
                  <TableCell>{admin.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      {/* )}    */}
    </div>
  );
}

export default ManageAdmin;
