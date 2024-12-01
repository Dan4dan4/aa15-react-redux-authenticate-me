import { spotsData } from "./Spotsdata"
import './Spots.css'

function Spots() {
    return (
        <div className="spots-container">
            {spotsData.map((spot) => (
                <div key={spot.id} className="spot-card">
                    <img src={spot.image} alt={spot.title} className="spot-image" />
                    <div className="spot-info">
                <h3>{spot.title}</h3>
                <p>{spot.price}</p>
          </div>
        </div>
      ))}
    </div>
    )
}

export default Spots