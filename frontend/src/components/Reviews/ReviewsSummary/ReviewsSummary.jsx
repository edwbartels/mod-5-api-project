import { useSelector } from 'react-redux';
import { FaStar } from 'react-icons/fa';

import './ReviewsSummary.css';

const ReviewsSummary = () => {
	const count = useSelector((state) => state.spots.current.numReviews);
	const rating = useSelector((state) => state.spots.current.avgStarRating);
	const formattedCount = count == 1 ? `${count} Review` : `${count} Reviews`;
	const formattedRating = rating
		? rating.toFixed(2).replace(/\.?0+$/, '')
		: 'New';

	return (
		<div className="review-summary">
			<FaStar />
			<span>{formattedRating}</span>
			<span className="dot"> . </span>
			<span>{formattedCount}</span>
		</div>
	);
};

export default ReviewsSummary;
