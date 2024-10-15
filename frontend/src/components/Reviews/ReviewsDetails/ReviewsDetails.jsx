import { useSelector } from 'react-redux';
import * as reviewActions from '../../../store/reviews';
import * as get from '../../../store/selectors';
import OpenModalButton from '../../OpenModalButton';
import DeleteReviewModal from '../../User/Reviews/DeleteReviewModal';
import './ReviewsDetails.css';

const ReviewsDetails = ({ review }) => {
	const user = useSelector(get.getUser);

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleString('en-US', { month: `long`, year: `numeric` });
	};

	const formattedDate = formatDate(review.createdAt);

	return (
		<div>
			<div className="review-info">
				<div className="review-author-name">{review.User.firstName}</div>
				<div className="review-date">{formattedDate}</div>
			</div>
			<p>{review.review}</p>
			{review.userId == user?.id && (
				<OpenModalButton
					buttonText="Delete"
					modalComponent={<DeleteReviewModal review={review} />}
				/>
			)}
		</div>
	);
};

export default ReviewsDetails;
