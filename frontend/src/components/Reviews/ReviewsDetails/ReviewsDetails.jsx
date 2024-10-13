import { useSelector } from 'react-redux';
import * as get from '../../../store/selectors';
import './ReviewsDetails.css';

const ReviewsDetails = ({ review }) => {
	console.log('IN DETAILS', review);

	const owner = useSelector(get.getOwner);
	const user = useSelector(get.getUser);

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleString('en-US', { month: `long`, year: `numeric` });
	};

	const formattedDate = formatDate(review.createdAt);

	return (
		<li>
			<div>
				{`
				${review.User.firstName}
				${formattedDate}`}
			</div>
			<h2>{`REVIEW:ID ${review.id}`}</h2>
			<p>{review.review}</p>
		</li>
	);
};

export default ReviewsDetails;
