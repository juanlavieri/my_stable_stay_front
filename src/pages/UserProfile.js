import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserProfile() {
  const [userData, setUserData] = useState({ name: '', email: '', roles: [] });
  const [editMode, setEditMode] = useState(false);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.get('http://localhost:3001/api/users/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('userToken');
      await axios.put('http://localhost:3001/api/users/profile', userData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log("Profile updated successfully");
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      {editMode ? (
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" value={userData.name} onChange={handleChange} />
          <input type="email" name="email" value={userData.email} onChange={handleChange} />
          <button type="submit">Update Profile</button>
          <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
        </form>
      ) : (
        <>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        </>
      )}
    </div>
  );
}

export default UserProfile;
