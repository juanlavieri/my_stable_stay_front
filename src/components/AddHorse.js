import React, { useState } from 'react';
import axios from 'axios';

function AddHorse() {
  const [horseData, setHorseData] = useState({
    name: '',
    breed: '',
    age: '',
    medicalDocuments: []
    // Add other fields as necessary
  });

  // Component code will go here
  const handleChange = (e) => {
    setHorseData({ ...horseData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const userToken = localStorage.getItem('token'); // Retrieve the token from local storage
    if (!userToken) {
      console.error('No token found');
      return; // Optionally handle the lack of a token
    }
  
    try {
      const response = await axios.post('http://localhost:3001/api/horses', horseData, {
        headers: {
          'Authorization': `Bearer ${userToken}`
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
      {/* Add inputs for other fields like medical documents */}
      <button type="submit">Add Horse</button>
    </form>
  );
}

export default AddHorse;
