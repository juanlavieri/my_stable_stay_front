import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { name, email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/users/register', formData);
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error(error.response.data); // Error handling
    }
  };

  return (
    <form onSubmit={e => onSubmit(e)}>
      <input type="text" placeholder="Name" name="name" value={name} onChange={e => onChange(e)} required />
      <input type="email" placeholder="Email" name="email" value={email} onChange={e => onChange(e)} required />
      <input type="password" placeholder="Password" name="password" value={password} onChange={e => onChange(e)} required />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
