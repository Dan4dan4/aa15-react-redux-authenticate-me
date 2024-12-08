import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { getSpotDetails } from "../../store/spot"
import './SpotDetails.css'


function SpotDetails() {
    const { id } = useParams(); 
    const dispatch = useDispatch(); 
    const spot = useSelector(state => state.spots.spotDetails);
    const user = useSelector(state => state.session.user); 

    useEffect(() => {
        dispatch(getSpotDetails(id));
    }, [dispatch, id]); 

    if (!spot) {
        return <h1>Spot doesnt exist</h1>;
    }

    // console.log(spot)



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
                        <span className="new3">New</span> 
                        : <span className="average-rating">
                            {(
                                spot.reviews.reduce((acc, review) => acc + review.rating, 0) / spot.reviews.length
                            ).toFixed(2)}
                        </span>}
                    {spot.reviews && spot.reviews.length > 0 && (
                        <ul>
                            {spot.reviews.map((review) => (
                                <li key={review.id}>
                                    {review.comment} - {review.rating} stars
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {hideBtn && (
                    <div className="post-review-container">
                        <button 
                            className="post-review-button" 
                            onClick={() => alert("make modal for this")}>
                            Post Your Review
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SpotDetails;
