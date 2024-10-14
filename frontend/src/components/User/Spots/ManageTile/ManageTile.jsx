import React from 'react';
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
		<li>
			<div className="spot-details" onClick={handleClick}>
				<ul>
					<li>
						<img src={spot.previewImage || null} />
						<span>
							{spot.city}, {spot.state}
						</span>
					</li>
					<li>
						<span>{`${spot.name} `}</span>
						<span>
							<FaStar />
							{` ${spot.avgRating ? spot.avgRating.toFixed(2) : 'New'}`}
						</span>
					</li>
					<li>
						<span>
							{spot.price}
							<label>night</label>
						</span>
					</li>
				</ul>
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
		</li>
	);
};

export default ManageTile;
