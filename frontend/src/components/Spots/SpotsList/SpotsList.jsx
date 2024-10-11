import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllSpots } from '../../../store/spots';

import './SpotsList.css';

const SpotsList = () => {
	const dispatch = useDispatch();
	const spots = useSelector((state) => state.spots.all);
	console.log('SPOTS LIST COMPONENT:', spots);

	useEffect(() => {
		dispatch(getAllSpots());
	}, [dispatch]);

	return (
		<>
			<h2>All Spots</h2>
			<ul>
				{spots.map((spot) => (
					<li key={spot.id}>{spot.name}</li>
				))}
			</ul>
		</>
	);
};

export default SpotsList;
