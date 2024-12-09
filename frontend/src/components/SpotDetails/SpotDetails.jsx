import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getSpotDetails } from "../../store/spot";
import { getReviewsForSpot, addReview } from "../../store/review"; 
import './SpotDetails.css';
import { useModal } from "../../context/Modal";
import ReviewForm from "../ReviewForm/ReviewForm";

function SpotDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots.spotDetails);
    const user = useSelector(state => state.session.user);
    const { setModalContent, setOnModalClose } = useModal();
    const reviews = useSelector(state => state.reviews.reviews);

    const [newReview, setNewReview] = useState(null);  

    useEffect(() => {
        dispatch(getSpotDetails(id));
        dispatch(getReviewsForSpot(id));
    }, [dispatch, id]);

    const handlePostReview = async (reviewData) => {
        const { spotId, review, stars } = reviewData;
        try {
            const response = await dispatch(addReview({ spotId, review, stars }));
            if (response && response.review) {
                setNewReview(response.review); 
                dispatch(getReviewsForSpot(id)); 
            }
        } catch (error) {
            console.error("Error posting review:", error);
        }
    };

    if (!spot) {
        return <h2>Loading spot details...</h2>;
    }

    // avg rating
    const averageRating = spot.reviews && spot.reviews.length > 0 ? (
        (spot.reviews.reduce((acc, review) => acc + review.stars, 0) / spot.reviews.length).toFixed(2)
    ) : null;

    const reviewCount = spot.reviews ? spot.reviews.length : 0;
    const reviewText = reviewCount === 1 ? "Review" : "Reviews";
    //host name
    const hostName = spot.Owner ? `${spot.Owner.firstName}` : "Unknown Host"; 
    //already reviewd check
    const userHasReviewed = spot.reviews && spot.reviews.some(review => review.userId === user.id); 
    //owner check
    const isOwner = spot.ownerId === user?.id; 
    // hide btn if alr reviewed or owner
    const hideBtn = user && !isOwner && !userHasReviewed;
    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long' };
        return new Date(date).toLocaleDateString(undefined, options);
    };

    return (
        <div>
            <h1>{spot.name}</h1>
            <img src={spot.previewImage} alt={spot.title} className="spot-image2" />
            <div className="container">
                <div className="infobox">
                    <p>Hosted by {hostName}</p>
                    <p className="description">{spot.description}</p>
                    <p>{spot.city}, {spot.state}, {spot.country}</p>
                </div>
                <div className="infobox2">
                    <div className="title-star-container">
                        <p>{spot.price} night</p>
                        <div className="star-container">
                            {averageRating && (
                                <>
                                    <p className="star">⭐</p>
                                    <span className="average-rating">{averageRating}</span>
                                </>
                            )}
                        </div>
                        <p>{reviewCount} {reviewText}</p>
                    </div>
                    <button className="reserve" onClick={() => alert("Feature coming soon")}>Reserve</button>
                </div>
            </div>
            <div className="review-section">
                <div className="review-box">
                    <h2>Customer Reviews</h2>

                    {reviews && reviews.length === 0 && !isOwner && user && (
                        <p>Be the first to post a review!</p>
                    )}

                    {reviews && reviews.length > 0 && (
                        <ul>
                            {newReview && (
                                <li key={newReview.id}>
                                    <p><strong>{newReview.user?.firstName || 'Unknown'}</strong> - {formatDate(newReview.createdAt)}</p>
                                    <p>{newReview.review} - {newReview.stars} stars</p>
                                </li>
                            )}
                            {reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((review) => (
                                <li key={review.id}>
                                    <p><strong>{review.user?.firstName || 'Unknown'}</strong> - {formatDate(review.createdAt)}</p>
                                    <p>{review.review} - {review.stars} stars</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {!isOwner && hideBtn && (
                    <div className="post-review-container">
                        <button 
                            className="post-review-button" 
                            onClick={() => {
                                setModalContent(
                                    <ReviewForm spotId={id} onSubmit={handlePostReview} />
                                );
                                setOnModalClose(() => {});
                            }}>
                            Post Your Review
                        </button>
                    </div>
                )}
                {!user && (
                    <div className="login-prompt">
                        <p>You must be logged in to post a review.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SpotDetails;
