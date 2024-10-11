import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllSpots } from '../../../store/spots';
import SpotsTile from '../SpotsTile';

import './SpotsList.css';

const SpotsList = () => {
	const dispatch = useDispatch();
	const spots = useSelector((state) => state.spots.all);

	useEffect(() => {
		dispatch(getAllSpots());
	}, [dispatch]);

	return (
		<>
			<h2>All Spots</h2>
			<ul>
				{spots.map((spot) => (
					<SpotsTile key={spot.id} spot={spot} />
				))}
			</ul>
		</>
	);
};

export default SpotsList;
