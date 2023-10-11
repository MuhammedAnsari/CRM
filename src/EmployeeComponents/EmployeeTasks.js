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
  const handleRequestMoreTime = (leadId) => {
    // Implement the logic for requesting more time here
    console.log(`Requested more time for lead with ID ${leadId}`);
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