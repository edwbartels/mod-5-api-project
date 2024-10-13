import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as spotActions from '../../../../store/spots';
import * as get from '../../../../store/selectors';
import ManageTile from '../ManageTile';
import './ManageList.css';

const ManageList = () => {
	const dispatch = useDispatch();
	const spots = useSelector(get.getUserSpots);

	useEffect(() => {
		dispatch(spotActions.getUserSpots());
	}, [dispatch]);

	return (
		<>
			<h2>Manage Your Spots</h2>
			<button>Create a New Spot</button>
			<ul>
				{spots?.map((spot) => (
					<ManageTile key={spot.id} spot={spot} />
				))}
			</ul>
		</>
	);
};
export default ManageList;
