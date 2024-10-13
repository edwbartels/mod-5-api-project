import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import './ManageTile.css';

const ManageTile = ({ spot }) => {
	const navigate = useNavigate();

	const handleClick = () => {
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
				<button onClick={handleClick}>Update</button>
				<button>Delete</button>
			</div>
		</li>
	);
};

export default ManageTile;
