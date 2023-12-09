import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/login",
        formData,
      );
      localStorage.setItem("userRole", JSON.stringify(response.data.role));
      localStorage.setItem("userToken", response.data.token);
      navigate("/user/profile"); // Redirect to profile or home page
    } catch (error) {
      setMessage(error.response ? error.response.data : "Login failed");
    }
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
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
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
