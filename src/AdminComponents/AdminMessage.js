import React, { useEffect, useState } from 'react';
import ComposeModal from './ComposeModal';
import axios from 'axios';

function AdminMessage() {
  // State to store the user data
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Make an HTTP request to fetch user data
    axios.get('http://localhost:5000/employees')
      .then((response) => {
        // Extract the 'name' property from the API response
        const userNames = response.data.map(user => user.name);
  
        //  user names
        console.log(userNames);
  
        // Update the state with the extracted names
        setUsers(userNames);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);
  

  return (
    <div>
      <h1>Mail Box</h1>
      <ComposeModal users={users} />
    </div>
  );
}

export default AdminMessage;
