import { useSelector } from 'react-redux';
import './ReviewsDetails.css';

const ReviewsDetails = ({ review }) => {
	console.log('IN DETAILS', review);

	const owner = useSelector((state) => state.spots.current?.Owner);

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleString('en-US', { month: `long`, year: `numeric` });
	};

	const formattedDate = formatDate(review.createdAt);

	return (
		<li>
			<div>
				{`
				${owner.firstName}
				${formattedDate}`}
			</div>
			<p>{review.review}</p>
		</li>
	);
};

export default ReviewsDetails;
