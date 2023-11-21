import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function HorseList() {
  const [horses, setHorses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHorses = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:3001/api/horses', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setHorses(response.data);
      } catch (error) {
        console.error(error);
        setError('An error occurred while fetching horses.');
      }
      setIsLoading(false);
    };
      
    fetchHorses();
  }, []);

  const handleDelete = async (horseId) => {
    if (window.confirm("Are you sure you want to delete this horse?")) {
      try {
        await axios.delete(`http://localhost:3001/api/horses/${horseId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setHorses(horses.filter(horse => horse._id !== horseId));
      } catch (error) {
        console.error(error);
        setError('An error occurred while deleting the horse.');
      }
    }
  };

  return (
    <div>
      <h2>My Horses</h2>
      {isLoading ? (
        <p>Loading horses...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <ul>
          {horses.map(horse => (
            <li key={horse._id}>
              {horse.name} - {horse.breed} - {horse.age}
              <button onClick={() => handleDelete(horse._id)}>Delete</button>
              <Link to={`/edit-horse/${horse._id}`}>Edit</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HorseList;
