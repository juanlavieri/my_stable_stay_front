import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function StableDetails() {
  const [stable, setStable] = useState(null);
  const { id } = useParams(); // Get stable ID from URL

  useEffect(() => {
    axios.get(`http://localhost:3001/api/stables/${id}`)
      .then(response => {
        setStable(response.data);
      })
      .catch(error => {
        console.error('Error fetching stable details', error);
      });
  }, [id]);

  return (
    <div>
      <h1>Stable Details</h1>
      {stable ? (
        <div>
          <h2>{stable.name}</h2>
          <p>{stable.description}</p>
          {/* Display more stable details here */}
        </div>
      ) : (
        <p>Loading stable details...</p>
      )}
    </div>
  );
}

export default StableDetails;
