import React, { useState, useEffect, useContext } from 'react';
import '../styling/review.css';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/user';
import { useParams } from 'react-router-dom';

function Review() {
  const history = useHistory();
  const { gameId } = useParams();
  const { user, setUser } = useContext(UserContext);

  const [game, setGame] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [editReview, setEditReview] = useState('');
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await fetch(`/games/${gameId}`);
        if (response.ok) {
          const gameData = await response.json();
          setGame(gameData);
          setReviews(gameData.reviews);
        }
      } catch (error) {
        console.error('Error fetching game details:', error);
      }
    };

    fetchGameDetails();
  }, [gameId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formObj = {
      review: newReview,
      game_id: game.id,
      user_id: user.id,
    };

    try {
      const response = await fetch('/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formObj),
      });

      if (response.ok) {
        const data = await response.json();
        setReviews([...reviews, data]);
      } else {
        const errorData = await response.json();
        console.log('Error:', errorData);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }

    setNewReview('');
  };

  const handlePatch = async (e, reviewId) => {
    e.preventDefault();
    setEdit(false);

    try {
      const response = await fetch(`/reviews/${reviewId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ review: editReview }),
      });

      if (response.ok) {
        const updatedReview = await response.json();
        setReviews(reviews.map((review) => (review.id === reviewId ? updatedReview : review)));
      } else {
        console.log('Error updating review:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      const response = await fetch(`/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        setReviews(reviews.filter((review) => review.id !== reviewId));
      } else {
        console.log('Error deleting review:', response.statusText);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/logout', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        setUser(null);
        history.push('/');
      } else {
        console.log('Error logging out:', response.statusText);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className='review-list'>
      <div className='top-right'>
        {user ? (
          <button className='logoutBtn' onClick={handleLogout}>
            Logout
          </button>
        ) : null}
      </div>
      <button className='backBtn' onClick={() => history.goBack()}>
        Back to Home
      </button>

      <ul className='reviews'>
        {game &&
          reviews.map((review) => (
            <div key={review.id} className='review-item'>
              <div>
                {user !== null &&
                  (user.id === review.user.id ? (
                    <div className='review-buttons'>
                      {edit === review.id ? (
                        <button
                          className='confirmBtn'
                          title='Update'
                          onClick={(e) => handlePatch(e, review.id)}
                        >
                          ✓
                        </button>
                      ) : (
                        <button
                          className='updateBtn'
                          title='Update'
                          onClick={() => {
                            setEdit(review.id);
                            setEditReview(review.review);
                          }}
                        >
                          ✎
                        </button>
                      )}
                      <button
                        className='deleteBtn'
                        title='Delete'
                        onClick={() => handleDelete(review.id)}
                      >
                        X
                      </button>
                    </div>
                  ) : null)}
              </div>
              <div className='review-container'>
                <p>
                  <span className='review-username'>
                    {review.user.user_name}:
                  </span>{' '}
                </p>
                {edit === review.id ? (
                  <form onSubmit={(e) => handlePatch(e, review.id)} className='edit-input-container'>
                    <input
                      className='edit-input'
                      id='review'
                      onChange={(e) => setEditReview(e.target.value)}
                      type='text'
                      value={editReview}
                    />
                  </form>
                ) : (
                  <p>{review.review}</p>
                )}
              </div>
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