// In src/components/EditHorse.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditHorse({ match }) {
  const [horseData, setHorseData] = useState({
    name: '',
    breed: '',
    age: '',
    medicalDocuments: []
    // Initialize other fields
  });

  useEffect(() => {
    // Fetch the horse data when the component mounts
    const fetchHorseData = async () => {
      const response = await axios.get(`http://localhost:3001/api/horses/${match.params.horseId}`);
      setHorseData(response.data);
    };

    fetchHorseData();
  }, [match.params.horseId]);

  const handleChange = (e) => {
    setHorseData({ ...horseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/horses/${match.params.horseId}`, horseData);
      // Handle successful update
    } catch (error) {
      console.error(error.response.data); // Error handling
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields similar to AddHorse, but with horseData for value */}
      {/* ... */}
    </form>
  );
}

export default EditHorse;
