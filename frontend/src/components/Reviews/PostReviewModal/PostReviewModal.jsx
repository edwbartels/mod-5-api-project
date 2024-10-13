import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../../context/Modal';
// import * as reviewActions from '../../../store/reviews';
import * as spotActions from '../../../store/spots';
import * as get from '../../../store/selectors';

import './PostReviewModal.css';

const PostReviewModal = () => {
	const dispatch = useDispatch();
	const spotId = useSelector(get.getSpot).id;
	const [review, setReview] = useState('');
	const [stars, setStars] = useState('');
	const [errors, setErrors] = useState({});
	const { closeModal } = useModal();

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors({});
		const reviewData = {
			review,
			stars,
		};
		return dispatch(spotActions.postReview(spotId, reviewData))
			.then(closeModal)
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) {
					setErrors(data.errors);
				}
			});
	};

	const isDisabled = review.length < 10 || stars < 1 || stars > 5;
	return (
		<>
			<h1>Post Your Review</h1>
			<form onSubmit={handleSubmit}>
				<label>How was your stay?</label>
				<input
					type="text"
					value={review}
					onChange={(e) => {
						setReview(e.target.value);
					}}
					placeholder="Leave your review here..."
					required
				/>
				<input
					type="number"
					value={stars}
					onChange={(e) => setStars(e.target.value)}
					min="1"
					max="5"
					required
				/>
				<label>Stars</label>
				<button type="submit" disabled={isDisabled}>
					Submit Your Review
				</button>
			</form>
		</>
	);
};

export default PostReviewModal;
