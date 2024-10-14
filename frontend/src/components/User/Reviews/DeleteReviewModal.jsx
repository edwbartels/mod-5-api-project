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
		<>
			<h2> Confirm Delete</h2>
			<div>Are you sure you want to delete this review?</div>
			<button onClick={handleYes}>Yes (Delete Review)</button>
			<button onClick={handleNo}>No (Keep Review)</button>
		</>
	);
};

export default DeleteReviewModal;
