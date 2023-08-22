import React, { useState, useEffect, useContext } from 'react';
import '../styling/review.css';
import { UserContext } from '../context/user';
import { useParams } from 'react-router-dom';

function Review() {

  const {gameId} = useParams();

  const { user } = useContext(UserContext);

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5555/reviews')
      .then(r => {
        if (r.ok) {
          r.json().then(reviews => {
            setReviews(reviews);
          })
        }
      })
  }, [])

  const [newReview, setNewReview] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const formObj = {
      reviewer_name: user.user_name,
      review: newReview
    }

    fetch('http://127.0.0.1:5555/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formObj)
    })
      .then(r => {
        if (r.ok) {
          r.json()
            .then(data => {
              console.log(data)
            })
        }
        else {
          r.json()
            .then(data => {
              console.log(data)
            })
        }
      })
    setNewReview('');
  };

  return (
    <div className='review-list'>
      <ul className='reviews'>
        {reviews.map(review => (
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
