export const getOwner = (state) => state.spots.current?.Owner;
export const getUser = (state) => state.session.user;
export const getSpot = (state) => state.spots.current;
export const getReviews = (state) => state.spots.current?.Reviews;
export const getUserSpots = (state) => state.spots?.userSpots;
// export const getReviewUser = (state)=> state.spots.current?.Reviews.
