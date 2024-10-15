import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getReviewsBySpotId } from '../../../store/spots';
import ReviewsDetails from '../ReviewsDetails/ReviewsDetails';
import './ReviewsList.css';

const ReviewsList = () => {
	const { spotId } = useParams();

	const reviews = useSelector((state) => state.spots.current?.Reviews);
	const user = useSelector((state) => state.session.user);
	const owner = useSelector((state) => state.spots.current?.Owner);

	const reviewsArray = reviews
		? Object.values(reviews).sort(
				(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
		  )
		: [];

	if (reviewsArray.length === 0) {
		if (user && owner && user.id !== owner.id) {
			return <div>Be the first to post a review!</div>;
		}
	}
	return (
		<div className="reviews-list">
			{reviewsArray.map((review) => {
				return <ReviewsDetails key={review.id} review={review} />;
			})}
		</div>
	);
};

export default ReviewsList;
