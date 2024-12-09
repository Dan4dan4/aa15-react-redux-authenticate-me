import { csrfFetch } from './csrf';

const ADD_REVIEW = "reviews/addReview";
const UPDATE_REVIEW = "reviews/updateReview";
const DELETE_REVIEW = "reviews/deleteReview";
const SET_REVIEWS = "reviews/setReviews";

// action for add update delete review
const addReviewAction = (review) => {
  return {
    type: ADD_REVIEW,
    payload: review
  };
};

const updateReviewAction = (review) => {
  return {
    type: UPDATE_REVIEW,
    payload: review
  };
};

const deleteReviewAction = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    payload: reviewId
  };
};

const setReviewsAction = (reviews) => {
  return {
    type: SET_REVIEWS,
    payload: reviews
  };
};

// thunks for adding getting updatingdeleting,
export const addReview = (reviewData) => async (dispatch) => {
  const { spotId, review, stars } = reviewData;
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    body: JSON.stringify({
      review,
      stars
    })
  });

  const data = await response.json();
  if (response.ok && data.review) {
    dispatch(addReviewAction(data.review));
  } else {
    throw {
      errors: data.errors || ["Failed to submit review."]
    };
  }

  return response;
};

export const updateReview = (reviewId, updatedData) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'PUT',
    body: JSON.stringify(updatedData)
  });

  const data = await response.json();
  if (response.ok && data.review) {
    dispatch(updateReviewAction(data.review));
  } else {
    throw {
      errors: data.errors || ["Failed to update review."]
    };
  }

  return response;
};

export const deleteReview = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    dispatch(deleteReviewAction(reviewId));
  } else {
    throw {
      errors: ["Failed to delete review."]
    };
  }

  return response;
};

export const getReviewsForSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
  const data = await response.json();

  if (response.ok) {
    dispatch(setReviewsAction(data.Reviews));
  } else {
    throw {
      errors: data.errors || ["Failed to load reviews."]
    };
  }

  return response;
};
const initialState = {
    reviews: []
  };
  
  const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_REVIEW:
        return {
          ...state,
          reviews: [...state.reviews, action.payload],
        };
  
      case UPDATE_REVIEW:
        return {
          ...state,
          reviews: state.reviews.map((review) =>
            review.id === action.payload.id ? action.payload : review
          ),
        };
  
      case DELETE_REVIEW:
        return {
          ...state,
          reviews: state.reviews.filter((review) => review.id !== action.payload),
        };
  
      case SET_REVIEWS:
        return {
          ...state,
          reviews: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default reviewReducer;
  
export const reviewActions = {
    addReview,
    addReviewAction,
    updateReviewAction,
    setReviewsAction,
    deleteReviewAction
}