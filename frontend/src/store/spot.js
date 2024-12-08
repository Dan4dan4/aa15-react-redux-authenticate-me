// import { spotsData } from "../components/Spots/Spotsdata"
import { csrfFetch } from "./csrf"

const ADD_SPOT = "session/addSpot"
const LOAD_SPOTS = "session/loadSpots"
const SET_SPOT_DETAILS ='spot/spotdetails'
const UPDATE_SPOT = 'spot/updateSpot'
const DELETE_SPOT = 'spot/deleteSpot'
const CLEAR_SPOTS = 'spot/clearSpots';
const RESET_STORE = 'spot/resetStore'

//actions loadspot and addspot andsetspotdetails and update spot nd delete
const loadSpots = (spots) => {
    return{
        type: LOAD_SPOTS,
        payload: spots
    }
}

const addSpot = (spot) => {
    return {
        type: ADD_SPOT,
        payload: spot
    }
}

const setSpotDetails = (spot) => {
    return {
        type: SET_SPOT_DETAILS,
        payload: spot
    }
}

const updateSpot = (spot) => {
    return {
        type: UPDATE_SPOT,
        payload: spot
    }
}

const deleteSpot = (spot) => {
    return {
        type: DELETE_SPOT,
        payload: spot
    }
}

const clearSpots = () => { 
    return {
        type: CLEAR_SPOTS
    };
};

const resetStore = () => ({
    type: RESET_STORE
})

export const updateSpots = (spotId, spot) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/spots/${spotId}`, {
            method: "PUT",
            body: JSON.stringify(spot),
        });

        const data = await response.json();

        if (response.ok) {
            dispatch(updateSpot(data)); 
            return data;  
        } else {
            throw new Error(data.errors ? data.errors.join(', ') : "Spot update failed");
        }
    } catch (error) {
        console.error("Error updating spot:", error);
        throw new Error(error.message || "Error updating spot");
    }
};

export const deleteSpots = (spotId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/spots/${spotId}`, {
          method: "DELETE",
        });
    
        const data = await response.json();
    
        if (response.ok) {
          dispatch(deleteSpot(spotId));
        } else {
          throw new Error(data.message || "Error deleting spot");
        }
      } catch (error) {
        console.error("Error deleting spot:", error);
        throw new Error(error.message || "Error deleting spot");
      }
    };



export const loadUserSpots = () => async (dispatch) => {
    try {
      const response = await csrfFetch('/api/spots'); 
      const data = await response.json();
  
      if (response.ok) {
        dispatch(loadSpots(data));  
      } else {
        throw new Error('Error loading spots');
      }
    } catch (error) {
      console.error('Error loading spots:', error);
    }
  };
  
export const updateSpotDetails = (spotId, spot) => async (dispatch) => {
    const { address, city, state, country, name, description, price, lat, lng, previewImage } = spot;
    try {
        const response = await csrfFetch(`/api/spots/${spotId}`, {
            method: "POST",
            body: JSON.stringify({
                address,
                city,
                state,
                country,
                name,
                description,
                price,
                lat,
                lng,
                previewImage,
                })
            });
            const data = await response.json();

            if (response.ok) {
                dispatch(updateSpot(data));  // Dispatch the update action with the updated spot
                return data;  // Return the updated spot
            } else {
                console.error('Backend validation errors:', data.errors);
                throw new Error(data.errors ? data.errors.join(', ') : "Spot update failed");
            }
    
        } catch (err) {
            throw new Error(err.message || "Spot update failed");
        }
    };



//thunks to addspot
export const createSpot = (spot) => async (dispatch) => {
    const { address, city, state, country, name, description, price, lat, lng, previewImage } = spot;
    try {
        const response = await csrfFetch("/api/spots", {
            method: "POST",
            body: JSON.stringify({
                address,
                city,
                state,
                country,
                name,
                description,
                price,
                lat,
                lng,
                previewImage,
            })
        });

        const data = await response.json();

        if (response.ok) {
            dispatch(addSpot(data));
            return data
        } else {
            console.error('Backend validation errors:', data.errors);
            throw new Error(data.errors ? data.errors.join(', ') : "Spot creation failed");
        }

    } catch (err) {
        throw new Error(err.message || "Spot creation failed");
    }
};


export const getSpotDetails = (id) => {
    return async (dispatch) => {
            //fetch
            try {
                const response = await fetch(`/api/spots/${id}`);
                const data = await response.json();

                if (response.ok) {
                    dispatch(setSpotDetails(data));
                } else {
                    throw new Error(data.errors ? data.errors.join(', ') : "Fetching failed");
                }
            } catch (error) {
                console.error("Fetching failed:", error.message);
            }
        }
    };





//default state
const initialState = { user: null, allSpots:[], spotDetails: null };

const spotReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_SPOTS:
            {let state1 = {...state}
            state1.allSpots = action.payload
            return state1}
        case ADD_SPOT:
            {let newState = {...state}
            // spotsData.push(action.payload);
            newState.allSpots.push(action.payload)
            return newState}
        case SET_SPOT_DETAILS:
            return {
                ...state,
                spotDetails: action.payload,
            };
        case UPDATE_SPOT:
            return {
                ...state,
                allSpots: state.allSpots.map((spot) =>
                    spot.id === action.payload.id ? action.payload : spot
                ),
                spotDetails: action.payload, 
                };
        case DELETE_SPOT:
            return {
                ...state,
                allSpots: state.allSpots.filter((spot) => spot.id !== action.payload),
                };
        case CLEAR_SPOTS:  
            return {
                ...state,
                allSpots: []  
                };
        case RESET_STORE:
            return {
                ...state,
                allSpots: [],
                spotDetails: null,
                    };
        default:
            return state
    }
}

export default spotReducer


export const spotActions = {
    addSpot,
    loadSpots,
    setSpotDetails,
    updateSpot,
    deleteSpot,
    clearSpots,
    resetStore,
}