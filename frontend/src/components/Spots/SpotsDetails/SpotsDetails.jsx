import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import './SpotsDetails.css';
import { getSpot, getUser } from '../../../store/selectors';
import { getSpotById, getReviewsBySpotId } from '../../../store/spots';
import ReviewsSummary from '../../Reviews/ReviewsSummary';
import ReviewsList from '../../Reviews/ReviewsList';
import PostReviewModal from '../../Reviews/PostReviewModal';
import OpenModalButton from '../../OpenModalButton';

const SpotsDetails = () => {
	const dispatch = useDispatch();
	const { spotId } = useParams();
	const spot = useSelector(getSpot);
	const user = useSelector(getUser);
	const canReview =
		!useSelector((state) => state.spots?.hasReview) &&
		user?.id != spot.Owner?.id;
	console.log('CAN I REVIEW', canReview);

	useEffect(() => {
		dispatch(getSpotById(spotId)).then(dispatch(getReviewsBySpotId(spotId)));
	}, [dispatch, spotId, user]);

	const handleReserve = () => {
		window.alert(`Feature coming soon.`);
	};
	return (
		<div className="grid-item">
			<h2>{`${spot?.name} `}</h2>
			<ReviewsSummary />
			<h3>
				Location: {spot?.city}, {spot?.state}, {spot?.country}
			</h3>
			<h1>Images placeholder</h1>
			<div>
				Hosted by {spot?.Owner?.firstName} {spot?.Owner?.lastName}
			</div>
			<p>{spot?.description}</p>
			<div>
				<div>
					{spot?.price} <span>/ night</span>
				</div>
				<ReviewsSummary />
				{user && canReview && (
					<OpenModalButton
						buttonText="Post Your Review"
						modalComponent={<PostReviewModal />}
					/>
				)}
				<ReviewsList />
				<button onClick={handleReserve}>Reserve</button>
			</div>
		</div>
	);
};

export default SpotsDetails;
