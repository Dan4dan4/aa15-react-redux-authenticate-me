import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import * as spotActions from '../../store/spot'; 
import { useNavigate } from 'react-router-dom';
import './ManageSpot.css'
import DeleteConfirmationModal from './DeleteModal';
import { useModal } from '../../context/Modal';

function ManageSpots() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const spots = useSelector(state => state.spots.allSpots);
  const currentUser = useSelector(state => state.session.user);
  const { setModalContent, setModalVisibility } = useModal();

  const handleDelete = async (spotId) => {
    setModalContent(<DeleteConfirmationModal spotId={spotId} />);
    setModalVisibility(true);
  };

  const handleEdit = (spotId) => {
    navigate(`/spots/${spotId}/edit`);
  };
  useEffect(() => {
    dispatch(spotActions.loadUserSpots());
  }, [dispatch]);

  const userSpots = spots.filter(spot => spot.ownerId === currentUser?.id);
console.log(userSpots);

return (
    <div className="managespots-container">
      <h1>Manage Spots</h1>
  
      {userSpots.length > 0 ? (
        <div className="spots-container">
          {userSpots.map((spot) => (
            <div key={spot.id} className="spot-card"  onClick={() => handleEdit(spot.id)}>
              <img src={spot.previewImage} alt={spot.name} className="spot-image" />
              <div className="spot-info">
                <h3>{spot.name}</h3>
                <p className="spot-location">
                <p>${spot.price} per night</p>
                  {spot.address}, {spot.city}, {spot.state}, {spot.country}
                </p>
                <div className="spot-buttons">
                  <button className="btn" onClick={() => handleEdit(spot.id)}>Update</button>
                  <button className="btn" onClick={(e) => { 
                    e.stopPropagation(); 
                    handleDelete(spot.id); 
                  }}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
            <p>No spots to manage</p>
          <a href="/addspot" className="create-spot-link">Create a New Spot</a>
        </div>
      )}
    </div>
  );
}

export default ManageSpots;
