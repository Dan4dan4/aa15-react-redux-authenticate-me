// import { spotsData } from "../components/Spots/Spotsdata";

import { csrfFetch } from "./csrf"

const ADD_SPOT = "session/setSpot"
const LOAD_SPOTS = "session/loadSpots"

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

//thunks to addspot
export const createSpot = (spot) => async (dispatch) => {
    const { address, city, state, country, name, description, price, lat, lng } = spot;
    console.log('Spot data:', {
        address,
        city,
        state,
        country,
        name,
        description,
        price,
        lat,
        lng
    });
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
                lng
            })
        });

        const data = await response.json();

        if (response.ok) {
            dispatch(addSpot(data)); // Assuming data contains the spot created
        } else {
            // Log the errors returned from the backend
            console.error('Backend validation errors:', data.errors);
            throw new Error(data.errors ? data.errors.join(', ') : "Spot creation failed");
        }

    } catch (err) {
        console.error("Error creating spot:", err.message);
        throw new Error(err.message || "Spot creation failed");
    }
};




//default state
const initialState = { user: null };

const spotReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_SPOTS:
            return {
                ...state,
                allSpots:action.payload
            };
        case ADD_SPOT:
            return {
                ...state,
                allSpots: [...state.allSpots, action.payload]
            }
        default:
            return state
    }
}

export default spotReducer


export const spotActions = {
    addSpot,
    loadSpots
}