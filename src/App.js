import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import StableDetails from './pages/StableDetails';
import UserProfile from './pages/UserProfile';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar';
import AddHorse from './components/AddHorse';
import HorseList from './components/HorseList';
import StableList from './components/StableList';
//import StableForm from './components/StableForm';
import AddStablePage from './pages/AddStablePage';
import EditStablePage from './pages/EditStablePage';
import ManageStablesPage from './pages/ManageStablesPage';
import AddHorsePage from './pages/AddHorsePage';
import EditHorsePage from './pages/EditHorsePage';
import ManageHorsesPage from './pages/ManageHorsesPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/stables/:id" element={<StableDetails />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-horse" element={<AddHorse />} />
        <Route path="/horses" element={<HorseList />} />
        <Route path="/stables" component={<StableList />} />
        {/* Remove the duplicate route for '/add-stable' */}
        <Route path="/add-stable" element={<AddStablePage />} />
        <Route path="/edit-stable/:id" element={<EditStablePage />} />
        <Route path="/manage-stables" element={<ManageStablesPage />} />
        <Route path="/add-horse" element={<AddHorsePage />} />
        <Route path="/edit-horse/:horseId" element={<EditHorsePage />} />
        <Route path="/manage-horses" element={<ManageHorsesPage />} />

        {/* Define other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
