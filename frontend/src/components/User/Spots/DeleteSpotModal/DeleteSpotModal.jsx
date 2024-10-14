import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../../../context/Modal';
import * as spotActions from '../../../../store/spots';
import * as get from '../../../../store/selectors';
import './DeleteSpotModal.css';

const DeleteSpotModal = ({ spot }) => {
	const dispatch = useDispatch();
	const { closeModal } = useModal();
	const spotToDelete = spot;
	console.log(spotToDelete);

	const handleYes = () => {
		dispatch(spotActions.deleteSpot(spotToDelete));
		closeModal();
	};
	const handleNo = () => {
		closeModal();
	};

	return (
		<>
			<h2>Confirm Delete</h2>
			<div>Are you sure you want to remove this spot from the listings?</div>
			<button onClick={handleYes}>Yes (Delete Spot)</button>
			<button onClick={handleNo}> No (Keep Spot)</button>
		</>
	);
};
export default DeleteSpotModal;
