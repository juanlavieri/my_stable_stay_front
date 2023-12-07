import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function BookingStablePage() {
  const [bookingData, setBookingData] = useState({
    startDate: '',
    endDate: '',
    stableId: '',
    stallCount: 0,
    horseAssignments: []
  });
  const { stableId } = useParams();
  const navigate = useNavigate();
  const [horses, setHorses] = useState([]);

  useEffect(() => {
    // Fetch the list of user's horses
    const fetchHorses = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/horses', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('userToken')}`
          }
        });
        setHorses(response.data);
      } catch (error) {
        console.error("Error fetching horses:", error.response?.data || error.message);
      }
    };
    fetchHorses();
    setBookingData({ ...bookingData, stableId });
  }, [stableId]);

  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleHorseAssignmentChange = (e, horseId) => {
    // Logic to assign horses to stalls
    const updatedHorseAssignments = [...bookingData.horseAssignments];
    if (e.target.checked) {
      updatedHorseAssignments.push(horseId);
    } else {
      const index = updatedHorseAssignments.indexOf(horseId);
      if (index > -1) {
        updatedHorseAssignments.splice(index, 1);
      }
    }
    setBookingData({ ...bookingData, horseAssignments: updatedHorseAssignments });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Logic to submit the booking
    try {
      await axios.post('http://localhost:3001/api/bookings', bookingData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        }
      });
      navigate('/user/bookings'); // Redirect to user's bookings page
    } catch (error) {
      console.error("Error creating booking:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h2>Book Stable</h2>
      <form onSubmit={handleSubmit}>
        <input type="date" name="startDate" value={bookingData.startDate} onChange={handleChange} required />
        <input type="date" name="endDate" value={bookingData.endDate} onChange={handleChange} required />
        <input type="number" name="stallCount" value={bookingData.stallCount} onChange={handleChange} placeholder="Number of stalls" min="1" required />
        {horses.map(horse => (
          <div key={horse._id}>
            <label>
              <input type="checkbox" name="horseAssignments" onChange={(e) => handleHorseAssignmentChange(e, horse._id)} />
              {horse.name}
            </label>
          </div>
        ))}
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
}

export default BookingStablePage;
