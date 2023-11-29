import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditStablePage() {
  const [stableData, setStableData] = useState({
    name: '',
    location: '',
    description: '',
    pricePerNight: '',
    amenities: [],
    // Add other fields as necessary
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStableData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/stables/${id}`);
        setStableData(response.data);
      } catch (error) {
        console.error("Error fetching stable data:", error.response?.data || error.message);
      }
    };

    fetchStableData();
  }, [id]);

  const handleChange = (e) => {
    setStableData({ ...stableData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('userToken');
    try {
      await axios.put(`http://localhost:3001/api/stables/${id}`, stableData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      navigate('/manage-stables'); // Redirect to manage stables page after successful update
    } catch (error) {
      console.error("Error updating stable:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h2>Edit Stable</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields for stable details */}
        <input type="text" name="name" value={stableData.name} onChange={handleChange} placeholder="Stable Name" required />
        <input type="text" name="location" value={stableData.location} onChange={handleChange} placeholder="Location" required />
        <textarea name="description" value={stableData.description} onChange={handleChange} placeholder="Description"></textarea>
        <input type="number" name="pricePerNight" value={stableData.pricePerNight} onChange={handleChange} placeholder="Price Per Night" />
        {/* Add other fields and inputs as needed */}
        <button type="submit">Update Stable</button>
      </form>
    </div>
  );
}

export default EditStablePage;
