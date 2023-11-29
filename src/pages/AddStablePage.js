import React, { useState } from 'react';
import axios from 'axios';

function AddStablePage() {
  const [stableData, setStableData] = useState({
    name: '',
    location: '',
    description: '',
    pricePerNight: '',
    amenities: [],
    // Add other fields as necessary
  });

  const handleChange = (e) => {
    setStableData({ ...stableData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('userToken');
    try {
      await axios.post('http://localhost:3001/api/stables', stableData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // Handle success - maybe redirect to manage stables page or show success message
    } catch (error) {
      console.error("Error adding stable:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h2>Add New Stable</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields for stable details */}
        <input type="text" name="name" value={stableData.name} onChange={handleChange} placeholder="Stable Name" required />
        <input type="text" name="location" value={stableData.location} onChange={handleChange} placeholder="Location" required />
        <textarea name="description" value={stableData.description} onChange={handleChange} placeholder="Description"></textarea>
        <input type="number" name="pricePerNight" value={stableData.pricePerNight} onChange={handleChange} placeholder="Price Per Night" />
        {/* Add other fields and inputs as needed */}
        <button type="submit">Add Stable</button>
      </form>
    </div>
  );
}

export default AddStablePage;
