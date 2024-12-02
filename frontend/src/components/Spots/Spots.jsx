import { spotsData } from "./Spotsdata"
import './Spots.css'
import { useNavigate } from "react-router"
// import { useSelector } from "react-redux"

function Spots() {
        const navigate = useNavigate()

        const handleClick = (spotId) => {
            navigate(`/spots/${spotId}`)
        }

        return (
            <div className="spots-container">
                {spotsData.map((spot) => (
                    <div key={spot.id} className="spot-card" onClick={() => handleClick(spot.id)}>
                        <img src={spot.image} alt={spot.title} className="spot-image" />
                        <div className="spot-info">
                            <div className="big-star-container">
                                <h3>{spot.title}</h3>
                                <div className="star-container">
                                    <p className="star">⭐</p>
                                    {!spot.reviews ? <span className="new">New</span> : null}
                                </div>
                            </div>
                        </div>
                        <p className="spot-location">
                            {spot.city}, {spot.state}
                        </p>
                        <p>{spot.price} night</p>
                    </div>
                ))}
            </div>
        )
        
        
        
}

export default Spots