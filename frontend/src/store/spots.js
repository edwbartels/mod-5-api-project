const LOAD_ALL = 'spots/LOAD_ALL';
const LOAD_BY_ID = 'spots/LOAD_BY_ID';
const LOAD_REVIEWS_BY_ID = 'spots/LOAD_REVIEWS_BY_ID';
const CREATE_SPOT = 'spots/CREATE_SPOT';

const loadAll = (spots) => ({
	type: LOAD_ALL,
	spots,
});

export const getAllSpots = () => async (dispatch) => {
	const response = await fetch(`/api/spots`);

	if (response.ok) {
		const data = await response.json();
		const spotsArray = data.Spots;
		dispatch(loadAll(spotsArray));
	}
};

const loadById = (spot) => ({
	type: LOAD_BY_ID,
	spot,
});

export const getSpotById = (id) => async (dispatch) => {
	const response = await fetch(`/api/spots/${id}`);

	if (response.ok) {
		const spot = await response.json();
		spot.Reviews = [];
		console.log('IN FETCH', spot);
		dispatch(loadById(spot));
	}
};

const loadReviewsById = (id) => ({
	type: LOAD_REVIEWS_BY_ID,
	id,
});

export const getReviewsBySpotId = (id) => async (dispatch) => {
	const response = await fetch(`/api/spots/${id}/reviews`);

	if (response.ok) {
		const reviews = await response.json();
		console.log('IN FETCH', reviews);
		dispatch(loadReviewsById(reviews.Reviews));
	}
};

const createSpot = (spot) => ({
	type: CREATE_SPOT,
	spot,
});

export const postSpot = (spot) => async (dispatch) => {
	try {
		const response = await fetch('/api/spots', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(spot),
		});

		if (response.ok) {
			const newSpot = await response.json();
			dispatch(createSpot(newSpot));
		}
	} catch (err) {
		console.error(`Error adding spot`, err);
	}
};

const initialState = {
	all: [],
	current: [],
};

const spotsReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_ALL: {
			return {
				...state,
				all: action.spots,
			};
		}
		case LOAD_BY_ID: {
			return {
				...state,
				current: action.spot,
			};
		}
		case LOAD_REVIEWS_BY_ID: {
			const newState = { ...state };
			newState.current.Reviews = { ...action.id };
			console.log('IN CASE', newState);
			return { ...newState };
		}
		default:
			return state;
	}
};

export default spotsReducer;
