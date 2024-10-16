import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../../context/Modal';
// import * as reviewActions from '../../../store/reviews';
import { FaStar } from 'react-icons/fa';
import { FaRegStar } from 'react-icons/fa';
import * as spotActions from '../../../store/spots';
import * as get from '../../../store/selectors';

import './PostReviewModal.css';

const PostReviewModal = () => {
	const dispatch = useDispatch();
	const spotId = useSelector(get.getSpot).id;
	const [review, setReview] = useState('');
	const [stars, setStars] = useState(0);
	const [hover, setHover] = useState(0);
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
		<div className="modal-box">
			<h1>How was your stay?</h1>
			<form onSubmit={handleSubmit}>
				<textarea
					type="text"
					value={review}
					onChange={(e) => {
						setReview(e.target.value);
					}}
					placeholder="Leave your review here..."
					required
				/>
				<div className="stars-rating">
					{[...Array(5)].map((star, index) => {
						index += 1;
						return (
							<span
								type="button"
								key={index}
								className={`star-button`}
								onClick={() => setStars(index)}
								onMouseEnter={() => setHover(index)}
								onMouseLeave={() => setHover(0)}
							>
								{index <= (hover || stars) ? <FaStar /> : <FaRegStar />}
							</span>
						);
					})}
					<span>Stars</span>
				</div>
				<button type="submit" disabled={isDisabled}>
					Submit Your Review
				</button>
			</form>
		</div>
	);
};

export default PostReviewModal;
