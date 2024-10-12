import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaStar } from 'react-icons/fa';

import './ReviewsSummary.css';

const ReviewsSummary = () => {
	// const dispatch = useDispatch();
	const count = useSelector((state) => state.spots.current.numReviews);
	const rating = useSelector((state) => state.spots.current.avgStarRating);
	// const reviews = useSelector((state) => state.spots.current.Reviews);
	const formattedCount = count == 1 ? `${count} Review` : `${count} Reviews`;
	const formattedRating = rating
		? rating.toFixed(2).replace(/\.?0+$/, '')
		: 'New';

	return (
		<div className="review-summary">
			<FaStar />
			{formattedRating}
			<span className="dot"> . </span>
			{formattedCount}
		</div>
	);
};

export default ReviewsSummary;
