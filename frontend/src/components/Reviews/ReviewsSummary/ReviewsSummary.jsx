import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSpotById, getReviewsBySpotId } from '../../../store/spots';
import { FaStar } from 'react-icons/fa';

import './ReviewsSummary.css';

const ReviewsSummary = () => {
	const dispatch = useDispatch();
	const count = useSelector((state) => state.spots.current.numReviews);
	const rating = useSelector((state) => state.spots.current.avgStarRating);
	const formattedCount = count == 1 ? `${count} Review` : `${count} Reviews`;
	const formattedRating = rating ? rating.toFixed(2) : 'New';
	useEffect(() => {
		dispatch(getSpotById);
	}, [dispatch]);

	return (
		<div className="review-summary">
			<div className="star-plus-number">
				<span>
					<FaStar className="star" />
				</span>
				<span>{formattedRating}</span>
			</div>
			<span className="dot">.</span>
			<span>{formattedCount}</span>
		</div>
	);
};

export default ReviewsSummary;
