const LOAD_ALL = 'spots/LOAD_ALL';

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
		default:
			return state;
	}
};

export default spotsReducer;
