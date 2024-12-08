import  { useState } from 'react';

function ReviewForm({ spotId }) {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>How was your stay?</h2>
      <textarea
        placeholder="Leave your review here..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <div>
        <label>Stars:</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
      </div>
      <button type="submit" disabled={comment.length < 10 || rating === 0}>Submit Your Review</button>
    </form>
  );
}

export default ReviewForm;
