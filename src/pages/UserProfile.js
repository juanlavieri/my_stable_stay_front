import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserProfile() {
  const [userData, setUserData] = useState({ name: '', email: '' });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('userToken')}`
          }
        });
        setUserData(response.data);
      } catch (error) {
        // Handle error
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
      {/* Add form or functionality for updating profile */}
    </div>
  );
}

export default UserProfile;
