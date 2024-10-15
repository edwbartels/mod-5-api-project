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
	const imageArray = useSelector((state) => state.spots.current.SpotImages);
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
				<img
					className="image1"
					src={imageArray ? imageArray[0] : ''}
					title="Image One"
				/>
				<img src={imageArray ? imageArray[1] : ''} title="Image Two" />
				<img src={imageArray ? imageArray[2] : ''} title="Image Three" />
				<img src={imageArray ? imageArray[3] : ''} title="Image Four" />
				<img src={imageArray ? imageArray[4] : ''} title="Image Five" />
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
						<div className="price">
							<div className="price-number">{`$${spot.price}`}</div>
							<div className="night">night</div>
						</div>
						<ReviewsSummary />
					</div>
					<button className="reserve" onClick={handleReserve}>
						Reserve
					</button>
				</div>
			</div>
			<hr className="details-line"></hr>
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
