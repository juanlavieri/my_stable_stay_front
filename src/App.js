import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search'; // Import Search page
import StableDetails from './pages/StableDetails';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} /> {/* Add this line */}
        <Route path="/stables/:id" element={<StableDetails />} />
        <Route path="/user/profile" element={<UserProfile />} />
        {/* Define other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
