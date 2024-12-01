// import { spotsData } from "../components/Spots/Spotsdata";

import { spotsData } from "../components/Spots/Spotsdata"
import { csrfFetch } from "./csrf"

const ADD_SPOT = "session/addSpot"
const LOAD_SPOTS = "session/loadSpots"
const SET_SPOT_DETAILS ='spot/spotdetails'

//actions loadspot and addspot
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

//thunks to addspot
export const createSpot = (spot) => async (dispatch) => {
    const { address, city, state, country, name, description, price, lat, lng, previewImage } = spot;
    // console.log('Spot data:', {
    //     address,
    //     city,
    //     state,
    //     country,
    //     name,
    //     description,
    //     price,
    //     lat,
    //     lng
    // });
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
        } else {
            console.error('Backend validation errors:', data.errors);
            throw new Error(data.errors ? data.errors.join(', ') : "Spot creation failed");
        }

    } catch (err) {
        // console.error("Error creating spot:", err.message);
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
        default:
            return state
    }
}

export default spotReducer


export const spotActions = {
    addSpot,
    loadSpots,
    setSpotDetails,
}