import { csrfFetch } from './csrf';

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

//actions setuser and removeuser
const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER
  };
};


//thunks to login
export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/login", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password
    })
  });
  const data = await response.json();
  if(response.ok && data.user){
    dispatch(setUser(data.user));
  }else{
    throw {
      errors: data.errors || ["Login failed. Please try again."]
    };
  }
  // console.log(data); 
  return response;
};



//thunks to restoreuser
export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

//thunks to signup works
export const signup = (user) => async (dispatch) => {
  const { username, firstName, lastName, email, password } = user;
  //is this user or users
  const response = await csrfFetch("/api/signup", {
    method: "POST",
    body: JSON.stringify({
      username,
      firstName,
      lastName,
      email,
      password
    })
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

//logout thunk
export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/logout', {
    method: 'DELETE'
  });
  dispatch(removeUser());
  return response;
};

//default state
const initialState = { user: null };

//reducers
const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      {// console.log("Setting user:", action.payload); 
      let state1 = {...state}
      state1.user = action.payload
      return state1}
    case REMOVE_USER:
      {let state2 = {...state}
      state2.user = null
      return state2 }
    default:
          return state;
  }
};

export default sessionReducer;

export const sessionActions = {
    login,
    setUser,
    removeUser,
    signup,
    logout
  };