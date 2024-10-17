import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import './SpotsDetails.css';
import { getSpot, getUser } from '../../../store/selectors';
import {
	getSpotById,
	getReviewsBySpotId,
	changeLoading,
} from '../../../store/spots';
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
	const loading = useSelector((state) => {
		state.spots.loading;
	});
	const preview = imageArray?.find((el) => el.preview === true);
	const newArray =
		imageArray && [...imageArray]?.filter((el) => el !== preview);
	const canReview =
		!useSelector((state) => state.spots?.hasReview) &&
		user?.id != spot.Owner?.id;

	useEffect(() => {
		dispatch(getSpotById(spotId))
			.then(() => dispatch(getReviewsBySpotId(spotId)))
			.then(() => dispatch(changeLoading()));
	}, [dispatch, spotId, user]);

	const handleReserve = () => {
		window.alert(`Feature coming soon`);
	};

	if (loading) {
		return <div>Loading...</div>;
	}
	return (
		<div className="container">
			<h1 data-testid="spot-name" className="spot-title">{`${spot?.name} `}</h1>
			<h2 data-testid="spot-location" className="spot-location">
				{spot?.city}, {spot?.state}, {spot?.country}
			</h2>
			<div className="image-grid">
				<img
					data-testid="spot-large-image"
					className="image1"
					src={imageArray ? preview.url : ''}
					title="Image One"
				/>
				<img
					data-testid="spot-small-image"
					src={newArray ? newArray[0]?.url : ''}
					title="Image Two"
				/>
				<img
					data-testid="spot-small-image"
					src={newArray ? newArray[1]?.url : ''}
					title="Image Three"
				/>
				<img
					data-testid="spot-small-image"
					src={newArray ? newArray[2]?.url : ''}
					title="Image Four"
				/>
				<img
					data-testid="spot-small-image"
					src={newArray ? newArray[3]?.url : ''}
					title="Image Five"
				/>
			</div>
			<div className="details-section">
				<div className="host-section">
					<h3 data-testid="spot-host" className="host-title">
						Hosted by {spot?.Owner?.firstName} {spot?.Owner?.lastName}
					</h3>
					<p data-testid="spot-description">{spot?.description}</p>
				</div>
				<div data-testid="spot-callout-box" className="pricing-section">
					<div className="pricing-top">
						<div data-testid="spot-price" className="price">
							<div className="price-number">{`$${spot.price}`}</div>
							<div className="night">night</div>
						</div>
						<div className="review-small">
							<ReviewsSummary />
						</div>
					</div>
					<button
						data-testid="reserve-button"
						className="reserve"
						onClick={handleReserve}
					>
						Reserve
					</button>
				</div>
			</div>
			<hr className="details-line"></hr>
			<div className="review-big">
				<ReviewsSummary />
			</div>
			<div className="post-review-button">
				{user && canReview && (
					<OpenModalButton
						buttonText="Post Your Review"
						modalComponent={<PostReviewModal />}
					/>
				)}
			</div>
			<ReviewsList />
		</div>
	);
};

export default SpotsDetails;
