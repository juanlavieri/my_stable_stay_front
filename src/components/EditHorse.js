import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditHorse({ match }) {
  const [horseData, setHorseData] = useState({
    name: '',
    breed: '',
    age: '',
    medicalDocument: null // This will be a file object
  });

  useEffect(() => {
    const fetchHorseData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/horses/${match.params.horseId}`);
        setHorseData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHorseData();
  }, [match.params.horseId]);

  const handleChange = (e) => {
    setHorseData({ ...horseData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setHorseData({ ...horseData, medicalDocument: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', horseData.name);
    formData.append('breed', horseData.breed);
    formData.append('age', horseData.age);
    if (horseData.medicalDocument) {
      formData.append('medicalDocument', horseData.medicalDocument);
    }

    try {
      await axios.put(`http://localhost:3001/api/horses/${match.params.horseId}`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      // Handle successful update
    } catch (error) {
      console.error(error.response.data); // Error handling
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={horseData.name}
        onChange={handleChange}
        placeholder="Horse Name"
        required
      />
      <input
        type="text"
        name="breed"
        value={horseData.breed}
        onChange={handleChange}
        placeholder="Breed"
      />
      <input
        type="number"
        name="age"
        value={horseData.age}
        onChange={handleChange}
        placeholder="Age"
      />
      <input
        type="file"
        name="medicalDocument"
        onChange={handleFileChange}
      />
      <button type="submit">Update Horse</button>
    </form>
  );
}

export default EditHorse;
