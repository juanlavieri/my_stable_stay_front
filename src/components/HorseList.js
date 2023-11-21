import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function HorseList() {
  const [horses, setHorses] = useState([]);

  useEffect(() => {
    // Function to fetch horses from the backend
    const fetchHorses = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/horses', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming token is stored in local storage
          }
        });
        setHorses(response.data);
      } catch (error) {
        console.error(error);
      }
    };
      
    fetchHorses();
  }, []);
  
  const handleDelete = async (horseId) => {
    try {
      await axios.delete(`http://localhost:3001/api/horses/${horseId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      // Update the state to reflect the deletion
      setHorses(horses.filter(horse => horse._id !== horseId));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h2>My Horses</h2>
      <ul>
        {horses.map(horse => (
          <li key={horse._id}>
            {horse.name} - {horse.breed} - {horse.age}
            <button onClick={() => handleDelete(horse._id)}>Delete</button>
            <Link to={`/edit-horse/${horse._id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );  
}

export default HorseList;
