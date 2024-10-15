import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import './SpotsTile.css';

const SpotsTile = ({ spot }) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`spots/${spot.id}`);
	};

	return (
		<div className="grid-item">
			<img
				className="image-thumbnail"
				title={spot.name}
				src={spot.previewImage || null}
				onClick={handleClick}
			/>
			<div className="info">
				<div className="location-rating">
					<span>
						{spot.city}, {spot.state}
					</span>
					<span className="star-rating">
						<FaStar />
						{` ${spot.avgRating ? spot.avgRating.toFixed(2) : 'New'}`}
					</span>
				</div>
				<span className="price">${spot.price}/night</span>
			</div>
		</div>
	);
};

export default SpotsTile;
