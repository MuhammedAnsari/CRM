import React from 'react';

function Profile({ name, profileData }) {
  // Find the user's profile based on the provided name
  const user = profileData.find((profile) => profile.name === name);

  if (!user) {
    return <div>User not found.</div>;
  }

  return (
    <div>
      <h2>Manage Profile</h2>
      <p>Name: {user.name}</p>
      <p>Username: {user.username}</p>
      <p>Password: {user.password}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}

export default Profile;
