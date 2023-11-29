import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ManageStablesPage() {
  const [stables, setStables] = useState([]);

  useEffect(() => {
    const fetchStables = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const response = await axios.get('http://localhost:3001/api/stables', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setStables(response.data);
      } catch (error) {
        console.error("Error fetching stables:", error.response?.data || error.message);
      }
    };

    fetchStables();
  }, []);

  const handleDelete = async (stableId) => {
    try {
      const token = localStorage.getItem('userToken');
      await axios.delete(`http://localhost:3001/api/stables/${stableId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setStables(stables.filter(stable => stable._id !== stableId));
    } catch (error) {
      console.error("Error deleting stable:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h2>Manage Stables</h2>
      <Link to="/add-stable">Add New Stable</Link>
      <ul>
        {stables.map(stable => (
          <li key={stable._id}>
            {stable.name} - {stable.location}
            <Link to={`/edit-stable/${stable._id}`}>Edit</Link>
            <button onClick={() => handleDelete(stable._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageStablesPage;
