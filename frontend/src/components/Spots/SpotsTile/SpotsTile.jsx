import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SpotsTile.css';

const SpotsTile = ({ spot }) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`spots/${spot.id}`);
	};

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
					<span>{spot.avgRating || 'New'}</span>
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
