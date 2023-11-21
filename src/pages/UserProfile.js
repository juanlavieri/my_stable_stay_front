import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserProfile() {
    const [user, setUser] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editName, setEditName] = useState('');
    const [editEmail, setEditEmail] = useState('');

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

  const handleEdit = () => {
    setIsEditMode(true);
    setEditName(user.name);
    setEditEmail(user.email);
  };

  const handleSave = () => {
    // Example: PUT request to '/api/users/profile'
    axios.put('http://localhost:3001/api/users/profile', {
      name: editName,
      email: editEmail
      // Add other fields as necessary
    }, {
      // Include authorization header if needed
    })
    .then(response => {
      setUser(response.data);
      setIsEditMode(false);
    })
    .catch(error => {
      console.error('Error updating profile', error);
    });
  };

  return (
    <div>
      <h1>User Profile</h1>
      {user ? (
        isEditMode ? (
          <div>
            <input type="text" value={editName} onChange={e => setEditName(e.target.value)} />
            <input type="email" value={editEmail} onChange={e => setEditEmail(e.target.value)} />
            <button onClick={handleSave}>Save</button>
          </div>
        ) : (
          <div>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <button onClick={handleEdit}>Edit</button>
          </div>
        )
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
}

export default UserProfile;