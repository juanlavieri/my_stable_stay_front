import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function StableList() {
  const [stables, setStables] = useState([]);

  useEffect(() => {
    const fetchStables = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/stables', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('userToken')}` }
        });
        setStables(response.data);
      } catch (error) {
        console.error("Error fetching stables:", error.response?.data || error.message);
      }
    };

    fetchStables();
  }, []);

  // Add functions to handle edit and delete operations here

  return (
    <div>
      <h2>My Stables</h2>
      <Link to="/add-stable">Add New Stable</Link>
      {stables.map(stable => (
        <div key={stable._id}>
          <h3>{stable.name}</h3>
          <p>{stable.description}</p>
          {/* Add more stable details here */}
          {/* Add Edit and Delete buttons here */}
        </div>
      ))}
    </div>
  );
}

export default StableList;
