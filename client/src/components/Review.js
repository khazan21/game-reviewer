import React, { useState } from 'react';
import '../styling/review.css';

const mockReviews = [{
  id: 1,
  reviewer_name: 'Robert',
  review: 'wassup'
}, {
  id: 2,
  reviewer_name: 'Sadaf',
  review: 'yoooo'
  }];

function Review() {

  const [newReview, setNewReview] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    setNewReview('');
  };

  return (
    <div className='review-list'>
      <ul className='reviews'>
        {mockReviews.map(review => (
          <div key={review.id}>
            <p>{review.reviewer_name}: {review.review}</p>
          </div>
        ))}
      </ul>

      <form className='form' onSubmit={handleSubmit}>
        <h3>Leave a review!</h3>

        <input
          placeholder='Review'
          value={newReview}
          onChange={(event) => setNewReview(event.target.value)}
        />

        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}

export default Review;
