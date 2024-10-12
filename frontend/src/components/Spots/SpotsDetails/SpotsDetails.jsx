import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import './SpotsDetails.css';
import { getSpotById } from '../../../store/spots';
import { FaStar } from 'react-icons/fa';

const SpotsDetails = () => {
	const dispatch = useDispatch();
	const { spotId } = useParams();
	const spot = useSelector((state) => state.spots.current);
	// const [rating, setRating] = useState('New');
	// const formattedRating = new Intl.NumberFormat('en-US', {
	// 	minimumFractionDigits: 1,
	// 	maximumFractionDigits: 2,
	// }).format(spot.avgStarRating);

	// const formatRating = () => {
	// 	let avg = new Intl.NumberFormat('en-US', {
	// 		minimumFractionDigits: 1,
	// 		maximumFractionDigits: 2,
	// 	}).format(spot?.avgStarRating);
	// 	console.log(avg);
	// 	if (avg > 0) setRating(avg);
	// };

	useEffect(() => {
		dispatch(getSpotById(spotId));
		// formatRating();
	}, [dispatch, spotId]);

	const handleReserve = () => {
		window.alert(`Feature coming soon.`);
	};
	return (
		<section>
			<h2>
				{`${spot?.name} `}
				<div>
					<FaStar />
					<span> </span>
					{spot?.numReviews > 0 ? spot?.avgStarRating.toFixed(2) : 'New'}{' '}
					<span className="dot">. </span>
					{spot?.numReviews} Reviews
				</div>
			</h2>
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
				<div className="reviewCollection">
					<div>
						<FaStar />
						<span> </span>
						{spot?.avgStarRating ? spot?.avgStarRating.toFixed(2) : 'New'}
					</div>
					<div className="dot"> . </div>
					<div>
						{spot?.numReviews == 1
							? spot?.numReviews + ' Review'
							: spot?.numReviews + ' Reviews'}
					</div>
				</div>
				<button onClick={handleReserve}>Reserve</button>
			</div>
		</section>
	);
};

export default SpotsDetails;
