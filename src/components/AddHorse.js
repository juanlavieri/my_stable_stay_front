import React, { useState } from 'react';
import axios from 'axios';

function AddHorse() {
  const [horseData, setHorseData] = useState({
    name: '',
    breed: '',
    age: '',
    medicalDocument: null // This will be a file object
  });

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

    const userToken = localStorage.getItem('token');
    if (!userToken) {
      console.error('No token found');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/horses', formData, {
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data); // Handle the response as needed
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
      <button type="submit">Add Horse</button>
    </form>
  );
}

export default AddHorse;
