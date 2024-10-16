import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as spotActions from '../../../../store/spots';
import * as get from '../../../../store/selectors';
import ManageTile from '../ManageTile';
import './ManageList.css';

const ManageList = () => {
	const dispatch = useDispatch();
	const spots = useSelector(get.getUserSpots);
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(spotActions.getUserSpots());
	}, [dispatch]);

	return (
		<div className="manage-container">
			<h1>Manage Your Spots</h1>
			<button
				className="manage-create-home"
				onClick={() => navigate('/spots/create')}
			>
				Create a New Spot
			</button>
			<div className="grid-container">
				{spots?.map((spot) => (
					<ManageTile key={spot.id} spot={spot} />
				))}
			</div>
		</div>
	);
};
export default ManageList;
