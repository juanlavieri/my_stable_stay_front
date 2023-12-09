import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import StableDetails from './pages/StableDetails';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<Search />} />
        <Route path='/stable/:id' element={<StableDetails />} />
        <Route path='/user/profile' element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
