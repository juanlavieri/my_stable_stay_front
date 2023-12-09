import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/users/register", formData);
      navigate("/login"); // Redirect to login after successful registration
    } catch (error) {
      setMessage(error.response ? error.response.data : "Registration failed");
    }
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={(e) => onChange(e)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={(e) => onChange(e)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={password}
        onChange={(e) => onChange(e)}
        required
      />
      {message && <p>{message}</p>}
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
