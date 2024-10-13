import { csrfFetch } from './csrf/';
const LOAD_ALL = 'spots/LOAD_ALL';
const LOAD_CURRENT_USER = 'spots/LOAD_CURRENT_USER';
const LOAD_BY_ID = 'spots/LOAD_BY_ID';
const LOAD_REVIEWS_BY_ID = 'spots/LOAD_REVIEWS_BY_ID';
const CREATE_SPOT = 'spots/CREATE_SPOT';
const ADD_IMAGE = 'spots/ADD_IMAGE';
const USER_HAS_REVIEW = 'spots/USER_HAS_REVIEW';
const POST_REVIEW = '/spots/';

// @ GET ALL SPOTS
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

// @ GET ALL SPOTS OF CURRENT USER
const loadUserSpots = (spots) => ({
	type: LOAD_CURRENT_USER,
	spots,
});
export const getUserSpots = () => async (dispatch) => {
	const response = await csrfFetch(`/api/spots/current`);

	if (response.ok) {
		const data = await response.json();
		const spotsArray = data.Spots;
		dispatch(loadUserSpots(spotsArray));
	}
};

// @ GET SPOT BY ID
// ! CONSIDER REFACTOR TO INCLUDE GET REVIEWS IN THIS
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
		return spot;
	}
};

// @ GET REVIEWS BY SPOT ID
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
		dispatch(setHasReview(reviews.hasReview));
	}
};

// @ SET USER REVIEW BOOLEAN
const setHasReview = (hasReview) => ({
	type: USER_HAS_REVIEW,
	hasReview,
});

// @ CREATE SPOT
const createSpot = (spot) => ({
	type: CREATE_SPOT,
	spot,
});

export const postSpot = (spot, images, navigate) => async (dispatch) => {
	try {
		const response = await csrfFetch('/api/spots', {
			method: 'POST',
			body: JSON.stringify(spot),
		});

		if (response.ok) {
			const newSpot = await response.json();
			navigate(`/spots/${newSpot.id}`);

			await Promise.all(
				Object.values(images).map(async (image) => {
					await dispatch(postSpotImage(newSpot.id, image));
				})
			);
		}
	} catch (err) {
		console.error(`Error adding spot`, err);
	}
};

// @ ADD IMAGE TO SPOT
const addSpotImage = (spotId, image) => ({
	type: ADD_IMAGE,
	image,
});

export const postSpotImage = (spotId, image) => async (dispatch) => {
	try {
		const response = await csrfFetch(`/api/spots/${spotId}/images`, {
			method: 'POST',
			body: JSON.stringify(image),
		});
	} catch (err) {
		console.error(`Error adding image to spot`, err);
	}
};

// @ POST REVIEW TO SPOT
const addReview = (review) => ({
	type: POST_REVIEW,
	review,
});

export const postReview = (spotId, review) => async (dispatch) => {
	try {
		const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
			method: 'POST',
			body: JSON.stringify(review),
		});

		if (response.ok) {
			dispatch(getSpotById(spotId)).then(dispatch(getReviewsBySpotId(spotId)));
		}
	} catch (err) {
		console.error(`Error adding review to spot`, err);
	}
};

const initialState = {
	all: [],
	current: [],
	hasReview: false,
};

const spotsReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_ALL: {
			return {
				...state,
				all: action.spots,
				current: [],
				hasReview: false,
			};
		}
		case LOAD_CURRENT_USER: {
			return {
				...state,
				current: [],
				hasReview: false,
				userSpots: action.spots,
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
		case CREATE_SPOT: {
			const { id } = action.spot;
			const newState = { ...state };
			newState.all[id] = action.spot;
			newState.current = action.spot;
			return { ...newState };
		}
		case USER_HAS_REVIEW: {
			return {
				...state,
				hasReview: action.hasReview,
			};
		}
		// * MAYBE REVISIT
		// // ! Need to fix IDing in objects to reflect actual ID (source: inital build of review object)
		// case POST_REVIEW: {
		// 	const newState = { ...state };
		// 	const id = action.review.id - 1;
		// 	newState.current.Reviews = {
		// 		...newState.current.Reviews,
		// 		[id]: action.review,
		// 	};
		// }
		default:
			return state;
	}
};

export default spotsReducer;
