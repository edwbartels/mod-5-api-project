import { useDispatch } from 'react-redux';
import { useModal } from '../../../context/Modal';
import * as reviewActions from '../../../store/reviews';
import './DeleteReviewModal.css';

const DeleteReviewModal = ({ review }) => {
	const dispatch = useDispatch();
	const { closeModal } = useModal();

	const handleYes = () => {
		dispatch(reviewActions.deleteReview(review));
		closeModal();
	};

	const handleNo = () => {
		closeModal();
	};

	return (
		<div className="modal-box">
			<h1> Confirm Delete</h1>
			<div>Are you sure you want to delete this review?</div>
			<button onClick={handleYes}>Yes (Delete Review)</button>
			<button className="delete-review" onClick={handleNo}>
				No (Keep Review)
			</button>
		</div>
	);
};

export default DeleteReviewModal;
