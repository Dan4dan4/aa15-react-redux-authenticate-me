import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { reviewActions } from '../../store/review';

function ReviewForm({ spotId }) {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    const newErrors = {};
    if (comment.length < 10) {
      newErrors.comment = 'Review must be at least 10 characters';
    }
    if (rating < 1 || rating > 5) {
      newErrors.rating = 'Rating must be between 1 and 5';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const reviewData = {
      spotId,
      review: comment,
      stars: rating,
    };

    dispatch(reviewActions.addReview(reviewData))
      .then(() => {
        closeModal();
      })
      .catch(async (res) => {
        console.log('Review submission failed, response:', res);
        const data = await res.json();
        if (data?.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>How was your stay?</h2>

      <textarea
        placeholder="Leave your review here..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      {errors.comment && <p className="error">{errors.comment}</p>}

      <div>
        <label>Stars:</label>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <label key={star}>
              <input
                type="radio"
                name="rating"
                value={star}
                checked={rating === star}
                onChange={() => setRating(star)}
              />
              ⭐
            </label>
          ))}
        </div>

        {errors.rating && <p className="error">{errors.rating}</p>}
      </div>

      <button type="submit" disabled={comment.length < 10 || rating === 0}>
        Submit Your Review
      </button>
    </form>
  );
}

export default ReviewForm;
