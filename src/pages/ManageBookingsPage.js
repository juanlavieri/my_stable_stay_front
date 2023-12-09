import React, { useState, useEffect } from "react";
import axios from "axios";

function ManageBookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch all bookings for the stable owner's stables
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/bookings/my-stables",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
          },
        );
        setBookings(response.data);
      } catch (error) {
        console.error(
          "Error fetching bookings:",
          error.response?.data || error.message,
        );
      }
    };
    fetchBookings();
  }, []);

  return (
    <div>
      <h2>Manage Bookings</h2>
      {/* Display the list of bookings with details */}
      {bookings.map((booking) => (
        <div key={booking._id}>
          <p>Stable: {booking.stable.name}</p>
          <p>Start Date: {booking.startDate}</p>
          <p>End Date: {booking.endDate}</p>
          {/* Add more details as needed */}
        </div>
      ))}
    </div>
  );
}

export default ManageBookingsPage;
