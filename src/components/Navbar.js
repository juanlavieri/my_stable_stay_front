import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const userToken = localStorage.getItem('userToken');
  const userRole = localStorage.getItem('userRole');

  const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    window.location.href = '/login';
  };

  return (
    <nav>
      <Link to='/'>Home</Link>
      {userToken && userRole === 'stableOwner' && (
        <Link to='/manage-stables'>Manage Stables</Link>
      )}
      {userToken && (
        <>
          <Link to='/search'>Search</Link>
          <Link to='/manage-horses'>Manage Horses</Link>
          <Link to='/bookings'>Bookings</Link>
          <Link to='/user/profile'>Profile</Link>
          <button onClick={logout}>Logout</button>
        </>
      )}
      {!userToken && (
        <>
          <Link to='/register'>Register</Link>
          <Link to='/login'>Login</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;

// Importing the Navbar CSS
