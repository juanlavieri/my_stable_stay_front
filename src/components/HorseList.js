import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HorseList() {
  const [horses, setHorses] = useState([]);

  useEffect(() => {
    const fetchHorses = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/horses', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('userToken')}`
          }
        });
        setHorses(response.data);
      } catch (error) {
        // Handle error
      }
    };

    fetchHorses();
  }, []);

  return (
    <div>
      <h2>My Horses</h2>
      <ul>
        {horses.map(horse => (
          <li key={horse._id}>
            {horse.name} - {horse.breed} - {horse.age}
            {/* Add buttons or links for editing and deleting horses */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HorseList;
