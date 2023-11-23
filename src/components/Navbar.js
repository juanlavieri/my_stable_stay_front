import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('userToken') !== null;
    
    // Retrieve the active role from local storage, default to 'user'
    const activeRole = localStorage.getItem('userRole') || 'user';

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userRole');
        navigate('/login');
    };

    const handleSwitchRole = () => {
        const newRole = activeRole === 'user' ? 'stableOwner' : 'user';
        localStorage.setItem('userRole', newRole); // Update the role in local storage
        window.location.reload(); // Refresh the page to reflect the role change
    };

    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                {isLoggedIn && activeRole === 'stableOwner' && <li><Link to="/manage-stables">Manage Stables</Link></li>}
                {isLoggedIn && activeRole === 'user' && <li><Link to="/search">Search</Link></li>}
                {isLoggedIn ? (
                    <>
                        <li><Link to="/user/profile">Profile</Link></li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                        <li><button onClick={handleSwitchRole}>Switch to {activeRole === 'user' ? 'Stable Owner' : 'User'} Mode</button></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
