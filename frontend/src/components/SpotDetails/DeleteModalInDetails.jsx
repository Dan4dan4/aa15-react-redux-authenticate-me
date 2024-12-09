import { useDispatch } from 'react-redux';
import { deleteReview } from '../../store/review';
import { useModal } from '../../context/Modal';
import '../ManageSpot/DeleteModal.css';


function DeleteModalInDetails({ reviewId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();


  const handleDelete = () => {
    dispatch(deleteReview(reviewId))
      .then(() => closeModal())
      .catch((err) => {
        console.error("Error deleting review", err);
      });
  };


  return (
    <div className="delete-modal-container">
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to remove this review?</p>


      <div className="delete-modal-buttons">
        <button className="delete-button" onClick={handleDelete}>Yes (Delete Review)</button>
        <button className="cancel-button" onClick={closeModal}>No (Keep Review)</button>
      </div>
    </div>
  );
}


export default DeleteModalInDetails;
