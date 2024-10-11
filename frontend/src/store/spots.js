const LOAD_ALL = 'spots/LOAD_ALL';
const LOAD_BY_ID = 'spots/LOAD_BY_ID';

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
		console.log('IN FETCH', spot);
		dispatch(loadById(spot));
	}
};

const initialState = {
	all: [],
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
		default:
			return state;
	}
};

export default spotsReducer;
