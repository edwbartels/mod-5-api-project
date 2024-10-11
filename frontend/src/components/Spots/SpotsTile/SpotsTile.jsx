import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import './SpotsTile.css';

const SpotsTile = ({ spot }) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`spots/${spot.id}`);
	};
	const formattedRating = new Intl.NumberFormat('en-US', {
		minimumFractionDigits: 1,
		maximumFractionDigits: 2,
	}).format(spot.avgRating);

	return (
		<li className="spot-details" onClick={handleClick}>
			<ul>
				<li>
					<img src={spot.previewImage || null} />
					<span>
						{spot.city}, {spot.state}
					</span>
				</li>
				<li>
					<span>{spot.name}</span>
					<span>
						<FaStar />
						{formattedRating || 'New'}
					</span>
				</li>
				<li>
					<span>
						{spot.price}
						<label>night</label>
					</span>
				</li>
			</ul>
		</li>
	);
};

export default SpotsTile;
