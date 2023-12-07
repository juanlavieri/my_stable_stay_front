// Ratings and Reviews Component
import React, { useState } from 'react';
import axios from 'axios';

function RatingsAndReviews({ stableId }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !review) {
      alert('Please provide a rating and review.');
      return;
    }
    try {
      await axios.post(`/api/stables/${stableId}/reviews`, { rating, review });
      alert('Review submitted successfully.');
    } catch (error) {
      alert('Failed to submit the review.');
    }
  };

  return (
    <div>
      <h3>Leave a Review</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Rating:
          <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} />
        </label>
        <label>
          Review:
          <textarea value={review} onChange={(e) => setReview(e.target.value)}></textarea>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default RatingsAndReviews;
