import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/register">Register</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/search">Search</Link>
                </li>
                <li>
                    <Link to="/users/profile">Profile</Link>
                </li>
                <li>
                    <Link to="/stables">Edit Profile</Link>
                </li>

                {/* Add other navigation links as needed */}
            </ul>
        </nav>
    );
}

export default Navbar;
