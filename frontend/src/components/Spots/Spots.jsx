import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { useNavigate } from "react-router";
import { loadUserSpots} from "../../store/spot";
import './Spots.css';
// import { spotActions } from '../../store/spot'
// import { resetStore } from '../../store/spot'


function Spots() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const spots = useSelector(state => state.spots.allSpots);



  useEffect(() => {
    // dispatch(spotActions.resetStore());
    // dispatch(spotActions.clearSpots());
    // dispatch({ type: 'RESET_STORE' });
    dispatch(loadUserSpots());
    // localStorage.clear();
  }, [dispatch]
);

  const handleClick = (spotId) => {
    navigate(`/spots/${spotId}`);
  };

  return (
    <div className="spots-container">
      {spots.length === 0 ? (
        <p>No spots available</p>  
      ) : (
        spots.map((spot) => (
          <div key={spot.id} className="spot-card" onClick={() => handleClick(spot.id)}>
            <img src={spot.previewImage || spot.image} alt={spot.title} className="spot-image" />
            <div className="spot-info">
              <div className="big-star-container">
                <h3>{spot.name}</h3>
                <div className="star-container">
                  <p className="star">⭐</p>
                  {!spot.reviews ? <span className="new">New</span> : null}
                </div>
              </div>
            </div>
            <p className="spot-location">
              {spot.city}, {spot.state}
            </p>
            <p>${spot.price} night</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Spots;
