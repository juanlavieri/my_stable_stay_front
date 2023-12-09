import React, { useState, useEffect } from "react";
import axios from "axios";

function EditHorse({ match }) {
  const [horseData, setHorseData] = useState({
    name: "",
    breed: "",
    age: "",
    medicalDocuments: null,
  });

  useEffect(() => {
    const fetchHorseData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/horses/${match.params.horseId}`,
        );
        setHorseData(response.data);
      } catch (error) {
        // Handle error
        console.log(error);
      }
    };

    fetchHorseData();
  }, [match.params.horseId]);

  const handleChange = (e) => {
    if (e.target.name === "medicalDocuments") {
      setHorseData({ ...horseData, medicalDocuments: e.target.files[0] });
    } else {
      setHorseData({ ...horseData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", horseData.name);
    formData.append("breed", horseData.breed);
    formData.append("age", horseData.age);
    if (horseData.medicalDocuments) {
      formData.append("medicalDocuments", horseData.medicalDocuments);
    }

    try {
      await axios.put(
        `http://localhost:3001/api/horses/${match.params.horseId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );
      // Handle success (e.g., show a message, redirect, etc.)
      console.log("Updated Horse information!");
    } catch (error) {
      // Handle error
      console.log(error);
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
      <input type="file" name="medicalDocuments" onChange={handleChange} />
      <button type="submit">Update Horse</button>
    </form>
  );
}

export default EditHorse;
