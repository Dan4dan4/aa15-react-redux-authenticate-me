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
            }
        } catch (error) {
            console.error("Error posting review:", error);
        }
    };


    if (!spot) {
        return <h2>Loading spot details...</h2>;
    }

    const hostName = spot.Owner ? `${spot.Owner.firstName}` : "Unknown Host"; 
    const userHasReviewed = spot.reviews && spot.reviews.some(review => review.userId === user.id); 
    const isOwner = spot.ownerId === user?.id; 
    const hideBtn = user && !isOwner && !userHasReviewed; 

    return (
        <div>
            <h1>{spot.name}</h1>
            <img src={spot.previewImage} alt={spot.title} className="spot-image2" />
            <div className="thumbnail-container">
            </div>
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
                            <p className="star">⭐</p>
                            {!spot.reviews || spot.reviews.length === 0 ? <span className="new2">New</span> : null}
                        </div>
                    </div>
                    <button className="reserve" onClick={() => alert("Feature coming soon")}>Reserve</button>
                </div>
            </div>
            <div className="review-section">
                <div className="review-box">
                    <h2>Customer Reviews</h2>
                    <p className="star2">⭐</p>
                    {(!spot.reviews || spot.reviews.length === 0) ? 
                        <span className="new3">New</span> : 
                        <span className="average-rating">
                            {(
                                spot.reviews.reduce((acc, review) => acc + review.stars, 0) / spot.reviews.length
                            ).toFixed(2)}
                        </span>}
                    {reviews && reviews.length > 0 && (
                        <ul>
                            {newReview && (
                                <li key={newReview.id}>
                                    {newReview.review} - {newReview.stars} stars
                                </li>
                            )}
                            {reviews.map((review) => (
                                <li key={review.id}>
                                    {review.review} - {review.stars} stars
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
