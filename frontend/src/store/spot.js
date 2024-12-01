// import { spotsData } from "../components/Spots/Spotsdata";

import { spotsData } from "../components/Spots/Spotsdata"
import { csrfFetch } from "./csrf"

const ADD_SPOT = "session/addSpot"
const LOAD_SPOTS = "session/loadSpots"
const SET_SPOT_DETAILS ='spot/spotdetails'
const UPDATE_SPOT = 'spot/updateSpot'

//actions loadspot and addspot andsetspotdetails and update spot
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
            return data.id
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
        //check for hardcoded
        const foundSpot = spotsData.find(spot => spot.id === parseInt(id));
        if (foundSpot) {
            dispatch(setSpotDetails(foundSpot));

        } else {
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
            spotsData.push(action.payload);
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
        default:
            return state
    }
}

export default spotReducer


export const spotActions = {
    addSpot,
    loadSpots,
    setSpotDetails,
    updateSpot
}