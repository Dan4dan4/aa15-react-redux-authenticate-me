import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { getSpotDetails } from "../../store/spot"
// import { spotsData } from "../Spots/Spotsdata"
import './SpotDetails.css'

function SpotDetails() {
    const { id } = useParams();  // Get the id from the URL
    const dispatch = useDispatch();  // Initialize dispatch
    const spot = useSelector(state => state.spots.spotDetails);  // Get the spot details from Redux store
    const user = useSelector(state => state.session.user);  // Assuming user info is in session.user

    useEffect(() => {
        // Dispatch the action to fetch spot details by id
        dispatch(getSpotDetails(id));
    }, [dispatch, id]);  // Re-run effect when the id changes


    if (!spot) {
        return <h1>Spot doesnt exist</h1>;
    }


    const hostName = user ? `${user.firstName} ${user.lastName}` : "Unknown Host";

return(
    <div>
        <h1>{spot.title}</h1>
        <img src={spot.image} alt={spot.title} className="spot-image2" />
        <p>{spot.description}</p>
        <p>{spot.city}, {spot.state}, {spot.country} {spot.price} </p>
        <p>Hosted by {hostName}</p>
    </div>
)
}

export default SpotDetails