import React, { useState, useEffect, useContext } from 'react';
import '../styling/review.css';
import { UserContext } from '../context/user';
import { useParams } from 'react-router-dom';

function Review() {
  const { gameId } = useParams();
  const { user } = useContext(UserContext);
  const [placeholder, setPlaceholder] = useState('Review');
  const [game, setGame] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');

  useEffect(() => {
    fetch(`http://127.0.0.1:5555/games/${gameId}`)
      .then(r => {
        if (r.ok) {
          r.json().then(game => {
            setGame(game);
            setReviews(game.reviews);
          });
        }
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formObj = {
      reviewer_name: user.user_name,
      review: newReview,
      game_id: game.id,
      user_id: user.id
    };

    fetch('http://127.0.0.1:5555/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formObj)
    })
      .then(r => {
        if (r.ok) {
          r.json().then(data => {
            setReviews([...reviews, data]);
          });
        } else {
          r.json().then(data => {
            console.log(data);
          });
        }
      });
    setNewReview('');
  };

  return (
    <div className='review-container'>
      <div className='review-list'>
        <ul className='reviews'>
          {game && reviews.map(review => (
            <div className='review' key={review.id}>
              <button className='deleteBtn' title='Delete'>X</button>
              <button className='updateBtn' title='Update'>˄</button>
              <p className='userReview'>{review.reviewer_name}: {review.review}</p>
            </div>
          ))}
        </ul>

        <form className='submitReview' onSubmit={handleSubmit}>
          <h3>Leave a review!</h3>

          <input
            className='reviewInput'
            placeholder={placeholder}
            style={{ textAlign: 'center' }}
            value={newReview}
            onChange={(event) => setNewReview(event.target.value)}
            onFocus={() => setPlaceholder('')}
            onBlur={() => {
              if (newReview === '') {
                setPlaceholder('Review');
              }
            }} />

          <button className='submitBtn' disabled={!user} type="submit">Submit Review</button>
        </form>
      </div>
    </div>
  );
}

export default Review;
