import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search'; // Import Search page
import StableDetails from './pages/StableDetails';
import UserProfile from './pages/UserProfile';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar';
import AddHorse from './components/AddHorse';
import HorseList from './components/HorseList';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} /> {/* Add this line */}
        <Route path="/stables/:id" element={<StableDetails />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-horse" element={<AddHorse />} />
        <Route path="/horses" element={<HorseList />} />

        {/* Define other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
