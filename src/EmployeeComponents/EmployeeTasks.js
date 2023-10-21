import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';

function EmployeeTasks({ name }) {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    // Fetch leads data from the API
    fetch('http://localhost:5000/leads')
      .then((response) => response.json())
      .then((data) => {
        setLeads(data);
      })
      .catch((error) => {
        console.error('Error fetching leads:', error);
      });
  }, []);

  // Filter leads based on the assignedUser
  const filteredLeads = leads.filter((lead) => lead.assignedUser === name);

  // Function to handle requesting more time
  const handleRequestMoreTime = async (leadId) => {
    try {
      // Fetch the lead data from the server
      const response = await fetch(`http://localhost:5000/leads/${leadId}`);
  
      if (response.ok) {
        // If the GET request is successful, extract the data from the response
        const leadData = await response.json();
        const { title, assignedUser, deadlineDays } = leadData;
        
        // Log the extracted data for debugging purposes
        console.log('Extracted data:', { title, assignedUser, deadlineDays });
  
        // Now, you can proceed to make a POST request to store this data.
        const apiResponse = await fetch('http://localhost:5000/requests', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, assignedUser, deadlineDays }),
        });
  
        if (apiResponse.ok) {
          console.log('Request for more time created successfully.');
        } else {
          console.error('Error creating a request:', apiResponse.statusText);
        }
      } else {
        // Log an error message if the GET request for lead data fails
        console.error('Error fetching lead data:', response.statusText);
      }
    } catch (error) {
      // Log an error message if an unexpected error occurs
      console.error('Error handling more time request:', error);
    }
  };
  

  // Function to handle starting or completing a task
  const handleTaskStatusChange = async (leadId) => {
    try {
      // Find the lead with the given ID
      const leadIndex = leads.findIndex((lead) => lead._id === leadId);
  
      if (leadIndex !== -1) {
        // Toggle the task status between 'In Progress' and 'Completed' in the local state
        const updatedLeads = [...leads];
        const lead = updatedLeads[leadIndex];
  
        if (lead.status === 'Assigned' || lead.status === 'Completed') {
          lead.status = 'In Progress';
        } else if (lead.status === 'In Progress') {
          lead.status = 'Completed';
        }
  
        setLeads(updatedLeads);
  
        // Send a PUT request to update the status in the database
        const response = await fetch(`http://localhost:5000/update-lead-status/${leadId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: lead.status }),
        });
  
        if (response.ok) {
          console.log(`Lead status updated to ${lead.status} for lead with ID ${leadId}`);
        } else {
          console.error('Error updating lead status:', response.statusText);
        }
      }
    } catch (error) {
      console.error('Error updating lead status:', error);
    }
  };

  // handle download
  const handleDownload = (leadId, fileName) => {
    // Create a URL to download the file
    const downloadUrl = `http://localhost:5000/leads?download=true&leadId=${leadId}`;

    // Create an invisible anchor element to trigger the download
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.target = '_blank';
    link.download = fileName;
    link.style.display = 'none';
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Clean up the anchor element
    document.body.removeChild(link);
  };
  
  return (
    <div>
      <h2>Your Tasks</h2>
      <div>
        {filteredLeads.map((lead) => (
          <Card key={lead._id} variant="outlined">
          <CardContent>
            <Typography variant="h5" component="div">
              {lead.title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {lead.description}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {lead.deadlineDays} Day(s) remaining
            </Typography>
        
            {/* Buttons for requesting more time and starting/completing the task */}
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleRequestMoreTime(lead._id)}
            >
              Request More Time
            </Button>
            <Button
              variant="outlined"
              color={lead.status === 'In Progress' ? 'secondary' : 'primary'}
              onClick={() => handleTaskStatusChange(lead._id)}
              disabled={lead.status === 'Completed'}
            >
              {lead.status === 'In Progress' ? 'Task Completed' : 'Start Task'}
            </Button>
        
            {/* Button with a download symbol */}
            <Button
            variant="outlined"
             onClick={() => handleDownload(lead._id, lead.file.fileName)}
            >
              <DownloadIcon />
            </Button>
          </CardContent>
        </Card>
        ))}
      </div>
    </div>
  );
}

export default EmployeeTasks;