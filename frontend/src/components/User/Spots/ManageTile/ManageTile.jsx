// import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import OpenModalButton from '../../../OpenModalButton';
import DeleteSpotModal from '../DeleteSpotModal';
import './ManageTile.css';

const ManageTile = ({ spot }) => {
	const navigate = useNavigate();
	const spotToDelete = spot;
	console.log(spotToDelete);

	const handleClick = () => {
		navigate(`/spots/${spot.id}`);
	};
	const handleUpdate = () => {
		navigate(`/user/manage/spots/${spot.id}`);
	};

	return (
		<div className="grid-item">
			<div className="spot-details" onClick={handleClick}>
				<img
					className="image-thumbnail"
					title={spot.name}
					src={spot.previewImage || null}
				/>
				<div className="info">
					<div className="location-rating">
						<span>
							{spot.city}, {spot.state}
						</span>
						<span className="star-rating">
							<FaStar className="tile-star" />
							{` ${spot.avgRating ? spot.avgRating.toFixed(2) : 'New'}`}
						</span>
					</div>
					<span className="price">
						${spot.price}
						/night
					</span>
				</div>
			</div>
			<div className="manage-buttons">
				<button onClick={handleUpdate}>Update</button>
				{
					<OpenModalButton
						buttonText="Delete"
						modalComponent={<DeleteSpotModal spot={spotToDelete} />}
					/>
				}
			</div>
		</div>
	);
};

export default ManageTile;
