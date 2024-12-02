import { useDispatch } from 'react-redux';
import * as spotActions from '../../store/spot';
import { useModal } from '../../context/Modal';
import './DeleteModal.css'; 

function DeleteConfirmationModal({ spotId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal(); 

  const handleDelete = () => {
    dispatch(spotActions.deleteSpots(spotId)) 
      .then(() => closeModal()) 
      .catch((err) => {
        console.error("Error deleting spot", err);
      });
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <div className="delete-modal-container">
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to remove this spot?</p>

      <div className="delete-modal-buttons">
        <button className="delete-button" onClick={handleDelete}>Yes (Delete Spot)</button>
        <button className="cancel-button" onClick={handleCancel}>No (Keep Spot)</button>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
