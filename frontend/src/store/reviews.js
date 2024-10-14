import { csrfFetch } from './csrf';
import * as spotActions from './spots';

const POST_REVIEW = '/reviews/POST_REVIEW';
const DELETE_REVIEW = '/review_DELETE_REVIEW';

export const deleteReview = (review) => async (dispatch) => {
	const spotId = review.spotId;
	console.log('IN REVIEW DELETE PRE FETCH', spotId);
	const response = await csrfFetch(`/api/reviews/${review.id}`, {
		method: 'DELETE',
		body: JSON.stringify(review),
	});

	if (response.ok) {
		dispatch(spotActions.getReviewsBySpotId(spotId));
	}
};
