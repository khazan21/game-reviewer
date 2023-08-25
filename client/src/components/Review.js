import React, { useState, useEffect, useContext } from 'react';
import '../styling/review.css';
import { UserContext } from '../context/user';
import { useParams } from 'react-router-dom';

function Review() {
  const { gameId } = useParams();
  const { user } = useContext(UserContext);

  const [game, setGame] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');

  useEffect(() => {
    fetch(`/games/${gameId}`)
      .then((r) => {
        if (r.ok) {
          r.json().then((game) => {
            setGame(game);
            setReviews(game.reviews);
          });
        }
      });
  }, [gameId]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formObj = {
      review: newReview,
      game_id: game.id,
      user_id: user.id,
    };

    fetch('/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formObj),
    })
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            setReviews([...reviews, data]);
          });
        } else {
          r.json().then((data) => {
            console.log(data);
          });
        }
      });
    setNewReview('');
  };

  return (
    <div className='review-list'>
      <ul className='reviews'>
        {game &&
          reviews.map((review) => (
            <div key={review.id}>
              <p>
                <span className='review-username'>
                  {review.user.user_name}:
                </span>{' '}
                {review.review}
              </p>
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

        <button disabled={!user} type='submit'>
          Submit Review
        </button>
      </form>
    </div>
  );
}

export default Review;
