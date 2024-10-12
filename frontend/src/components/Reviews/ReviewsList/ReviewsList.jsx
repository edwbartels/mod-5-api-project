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

	console.log('IN REVIEWSLIST', reviews);
	const reviewsArray = reviews
		? Object.values(reviews).sort(
				(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
		  )
		: [];
	console.log('ARRAY', reviewsArray);

	if (reviewsArray.length === 0) {
		if (user && owner && user.id !== owner.id) {
			return <div>Be the first to post a review!</div>;
		}
	}
	return (
		<ul>
			{reviewsArray.map((review) => {
				console.log('SINGLE ITEM IN ARRAY', review);
				return <ReviewsDetails key={review.id} review={review} />;
			})}
		</ul>
	);
};

export default ReviewsList;
