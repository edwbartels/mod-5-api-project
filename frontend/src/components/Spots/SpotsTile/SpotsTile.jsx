// import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import './SpotsTile.css';

const SpotsTile = ({ spot }) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`spots/${spot.id}`);
	};

	return (
		<div data-testid="spot-tile" className="grid-item" onClick={handleClick}>
			<div className="tile-image-container">
				<img
					data-testid="spot-thumbnail-image"
					className="image-thumbnail"
					// title={spot.name}
					src={spot.previewImage || null}
					// onClick={handleClick}
				/>
				<span className="spot-tooltip" data-testid="spot-tooltip">
					{spot.name}
				</span>
				{/* <span data-testid="spot-tooltip" style={{ display: 'none' }}>
				{spot.name}
			</span> */}
			</div>
			<div className="info">
				<div className="location-rating">
					<span>
						<span data-testid="spot-city">{spot.city},</span> {spot.state}
					</span>
					<span className="star-rating">
						<FaStar className="tile-star" />
						<div data-testid="spot-rating">{`${
							spot.avgRating ? spot.avgRating.toFixed(2) : 'New'
						}`}</div>
					</span>
				</div>
				<span data-testid="spot-price" className="price">
					${spot.price}/night
				</span>
			</div>
		</div>
	);
};

export default SpotsTile;
