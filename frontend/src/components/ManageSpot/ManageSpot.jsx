import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import * as spotActions from '../../store/spot'; 
import { useNavigate } from 'react-router-dom';

function ManageSpots() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const spots = useSelector(state => state.spots.allSpots);
  const currentUser = useSelector(state => state.session.user);

  const handleDelete = async (spotId) => {
    try {
      await dispatch(spotActions.deleteSpots(spotId));  
    } catch (error) {
      console.error("Error deleting the spot:", error);
    }
  };

  const handleEdit = (spotId) => {
    navigate(`/spots/${spotId}/edit`);
  };
  useEffect(() => {
    dispatch(spotActions.loadUserSpots());
  }, [dispatch]);
  const userSpots = spots.filter(spot => spot.ownerId === currentUser?.id);

  return (
    <div>
      <h1>Manage Your Spots</h1>
      {userSpots.length > 0 ? (
        <ul>
          {userSpots.map((spot) => (
            <li key={spot.id}>
              <h3>{spot.name}</h3>  
              <p>{spot.address}, {spot.city}, {spot.state}, {spot.country}</p> 
              <p>${spot.price} per night</p> 
              <button onClick={() => handleEdit(spot.id)}>Edit</button>
              <button onClick={() => handleDelete(spot.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No spots available. You can add one!</p>
      )}
    </div>
  );
}

export default ManageSpots;
