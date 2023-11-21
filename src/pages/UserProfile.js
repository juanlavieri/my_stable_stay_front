import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/api/users/profile', {
      // Include authorization header if you're using token-based authentication
      headers: { Authorization: `Bearer YOUR_TOKEN_HERE` }
    })
    .then(response => {
      setUser(response.data);
    })
    .catch(error => {
      console.error('Error fetching user data', error);
    });
  }, []);

  return (
    <div>
      <h1>User Profile</h1>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          {/* Display additional user information here */}
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
}

export default UserProfile;
