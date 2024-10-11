import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import './SpotsDetails.css';
import { getSpotById } from '../../../store/spots';

const SpotsDetails = () => {
	const dispatch = useDispatch();
	const { spotId } = useParams();
	const spot = useSelector((state) => state.spots.current);

	useEffect(() => {
		dispatch(getSpotById(spotId));
	}, [dispatch, spotId]);

	const handleReserve = () => {
		window.alert(`Feature coming soon.`);
	};
	return (
		<section>
			<h2>{spot?.name}</h2>
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
				<button onClick={handleReserve}>Reserve</button>
			</div>
		</section>
	);
};

export default SpotsDetails;
