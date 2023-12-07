import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function StableDetails() {
  const [stableDetails, setStableDetails] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchStableDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/stables/${id}`);
        setStableDetails(response.data);
      } catch (error) {
        console.error("Error fetching stable details:", error);
      }
    };
    fetchStableDetails();
  }, [id]);

  return (
    <div>
      <h2>{stableDetails.name}</h2>
      {/* Display other stable details here */}
      <Link to={`/book-stable/${id}`}>Book This Stable</Link> {/* Link to book the stable */}
    </div>
  );
}

export default StableDetails;
