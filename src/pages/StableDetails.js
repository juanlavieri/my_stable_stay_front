import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StableDetails({ match }) {
  const [stableDetails, setStableDetails] = useState({});

  useEffect(() => {
    const fetchStableDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/stables/${match.params.id}`);
        setStableDetails(response.data);
      } catch (error) {
        // Handle error
      }
    };

    fetchStableDetails();
  }, [match.params.id]);

  return (
    <div>
      <h2>{stableDetails.name}</h2>
      {/* Display other stable details here */}
    </div>
  );
}

export default StableDetails;
