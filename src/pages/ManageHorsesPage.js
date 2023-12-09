import React from "react";
import HorseList from "../components/HorseList";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const ManageHorsesPage = () => {
  return (
    <div>
      <h1>Manage Horses</h1>
      <Link to="/add-horse">Add New Horse</Link> {/* Link to add a new horse */}
      <HorseList />
    </div>
  );
};

export default ManageHorsesPage;
