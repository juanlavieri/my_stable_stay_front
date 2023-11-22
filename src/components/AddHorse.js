import React, { useState } from 'react';
import axios from 'axios';

function AddHorse() {
  const [horseData, setHorseData] = useState({
    name: '',
    breed: '',
    age: '',
    medicalDocuments: null
  });

  const handleChange = (e) => {
    if (e.target.name === 'medicalDocuments') {
      setHorseData({ ...horseData, medicalDocuments: e.target.files[0] });
    } else {
      setHorseData({ ...horseData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', horseData.name);
    formData.append('breed', horseData.breed);
    formData.append('age', horseData.age);
    if (horseData.medicalDocuments) {
      formData.append('medicalDocuments', horseData.medicalDocuments);
    }

    try {
      const response = await axios.post('http://localhost:3001/api/horses', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        }
      });
      // Handle success (e.g., show a message, redirect, etc.)
      console.log(response.data);
    } catch (error) {
      // Handle error
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={horseData.name} onChange={handleChange} placeholder="Horse Name" required />
      <input type="text" name="breed" value={horseData.breed} onChange={handleChange} placeholder="Breed" />
      <input type="number" name="age" value={horseData.age} onChange={handleChange} placeholder="Age" />
      <input type="file" name="medicalDocuments" onChange={handleChange} />
      <button type="submit">Add Horse</button>
    </form>
  );
}

export default AddHorse;
