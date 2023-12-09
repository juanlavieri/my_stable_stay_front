import React, { useState, useEffect } from "react";
import axios from "axios";

function StableForm({ match }) {
  const [stableData, setStableData] = useState({
    name: "",
    location: "",
    description: "",
    pricePerNight: 0,
    amenities: "",
    paddocks: 0,
    groomAvailable: false,
    ownerQuartersAvailable: false,
    // Add other fields as necessary
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (match.params.id) {
      // Fetch data for editing
      axios
        .get(`http://localhost:3001/api/stables/${match.params.id}`)
        .then((response) => setStableData(response.data))
        .catch((error) => console.error("Error fetching stable data:", error));
    }
  }, [match.params.id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "image") {
      setImageFile(e.target.files[0]);
    } else {
      setStableData({
        ...stableData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (const key in stableData) {
      formData.append(key, stableData[key]);
    }
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      if (match.params.id) {
        // Edit stable
        await axios.put(
          `http://localhost:3001/api/stables/${match.params.id}`,
          formData,
        );
      } else {
        // Add new stable
        await axios.post("http://localhost:3001/api/stables", formData);
      }
      console.log("Stable saved successfully");
      // Redirect or update UI as needed
    } catch (error) {
      console.error("Error saving stable:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields for stable data */}
      <input
        type="text"
        name="name"
        value={stableData.name}
        onChange={handleChange}
        placeholder="Stable Name"
      />
      {/* Add other input fields here */}
      <input type="file" name="image" onChange={handleChange} />
      <button type="submit">Save</button>
    </form>
  );
}

export default StableForm;
