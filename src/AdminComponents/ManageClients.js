import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from 'axios';

function ManageClients() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    // Fetch client data from the server
    axios.get('http://localhost:5000/view-clients')
      .then((response) => {
        const { data } = response;
        setClients(data);
      })
      .catch((error) => {
        console.error('Error fetching client data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Client Section</h1>
      <div>  
        {clients.map((client) => (
          <Card key={client._id} variant="outlined">
            <CardContent>
              <Typography variant="h6" component="div">
                {client.clientName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Contact Person: {client.contactPerson}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Client Place: {client.clientPlace}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Contact Number: {client.contactNumber}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ManageClients;
