import React, { useState, useEffect } from "react";
import axios from "axios";

function HorseList() {
  const [horses, setHorses] = useState([]);

  useEffect(() => {
    const fetchHorses = async () => {
      try {
        const response = await axios.get("/api/horses");
        setHorses(response.data);
      } catch (error) {
        alert("Failed to load horses. Please refresh the page.");
      }
    };

    fetchHorses();
  }, []);

  return (
    <div>
      <h2>Horses</h2>
      <ul aria-label="List of horses">
        {horses.map((horse) => (
          <li key={horse.id}>
            <h3>{horse.name}</h3>
            <p>Breed: {horse.breed}</p>
            <p>Age: {horse.age}</p>
            // ... other horse details
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HorseList;
