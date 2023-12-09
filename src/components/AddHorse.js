import React, { useState } from "react";
import axios from "axios";

function AddHorse() {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [medicalDocuments, setMedicalDocuments] = useState([]);

  const handleFileChange = (e) => {
    setMedicalDocuments([...medicalDocuments, e.target.files[0]]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !breed || !age || medicalDocuments.length === 0) {
      alert("Please fill in all fields correctly.");
      return;
    }

    // Form submission logic
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("breed", breed);
      formData.append("age", age);
      medicalDocuments.forEach((doc) =>
        formData.append("medicalDocuments", doc),
      );

      const response = await axios.post("/api/horses", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Horse added successfully.");
    } catch (error) {
      alert("Error submitting the form. Please try again.");
    }
  };

  return (
    <div>
      <h2>Add Horse</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Breed"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input type="file" onChange={handleFileChange} multiple />
        <button type="submit">Add Horse</button>
      </form>
    </div>
  );
}

export default AddHorse;
