// Health Document Upload Component
import React, { useState } from "react";
import axios from "axios";

function HealthDocumentUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
    const formData = new FormData();
    formData.append("document", file);
    try {
      await axios.post("/api/horses/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Document uploaded successfully.");
    } catch (error) {
      alert("Failed to upload the document.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
}

export default HealthDocumentUpload;
