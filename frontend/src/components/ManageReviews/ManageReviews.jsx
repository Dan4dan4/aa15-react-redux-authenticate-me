import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteModalReview from './DeleteModalReview';
import { useModal } from '../../context/Modal';
import { getReviewsForUser } from '../../store/review';
import './ManageReviews.css'; 

function ManageReviews() {
  const dispatch = useDispatch();
  const reviews = useSelector(state => state.reviews.reviews);
  const currentUser = useSelector(state => state.session.user);
  const { setModalContent, setModalVisibility } = useModal();

  const handleDelete = async (reviewId) => {
    setModalContent(<DeleteModalReview reviewId={reviewId} />);
    setModalVisibility(true);
  };

  useEffect(() => {
    if (currentUser) {
      dispatch(getReviewsForUser());
    }
  }, [dispatch, currentUser]);

  const userReviews = reviews.filter(review => review.userId === currentUser?.id);

  return (
    <div className="managereviews-container">
      <h1>Manage Reviews</h1>

      {userReviews.length > 0 ? (
        <div className="reviews-container">
          {userReviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-image-container">
                <img src={review.spotPreviewImage} alt={review.spotName} className="review-image" />
              </div>
              <div className="review-info">
                <h3>{review.spotName}</h3>
                <p>{review.text}</p>
                <p><strong>Rating:</strong> {review.stars} / 5</p>
                <p>{review.spotLocation}</p>
                <div className="review-buttons">
                  <button className="btn" onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(review.id);
                  }}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>No reviews to manage</p>
        </div>
      )}
    </div>
  );
}

export default ManageReviews;
