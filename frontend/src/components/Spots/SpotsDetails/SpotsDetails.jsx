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
		<div className="container">
			<h1 className="spot-title">{`${spot?.name} `}</h1>
			<h2 className="spot-location">
				{spot?.city}, {spot?.state}, {spot?.country}
			</h2>
			<div className="image-grid">
				<img className="image1" src="" title="Image One" />
				<img src="" title="Image Two" />
				<img src="" title="Image Three" />
				<img src="" title="Image Four" />
				<img src="" title="Image Five" />
			</div>
			<div className="details-section">
				<div className="host-section">
					<h3 className="host-title">
						Hosted by {spot?.Owner?.firstName} {spot?.Owner?.lastName}
					</h3>
					<p>{spot?.description}</p>
				</div>
				<div className="pricing-section">
					<div className="pricing-top">
						<div className="price">{`${spot.price}`}</div>
						<div>night</div>
						<ReviewsSummary />
					</div>
					<button className="reserve" onClick={handleReserve}>
						Reserve
					</button>
				</div>
			</div>
			<div>
				<ReviewsSummary />
				{user && canReview && (
					<OpenModalButton
						buttonText="Post Your Review"
						modalComponent={<PostReviewModal />}
					/>
				)}
				<ReviewsList />
			</div>
		</div>
	);
};

export default SpotsDetails;
