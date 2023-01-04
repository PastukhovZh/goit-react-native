import { createSlice } from "@reduxjs/toolkit";

const state = {
  userId: null,
  login: null,
  email: null,
  stateChange: false,
  myImage: null,
};


 const authSlice = createSlice({
    name: "auth",
    initialState:state,
    reducers: {
        updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      login: payload.login,
      email: payload.email,
      myImage: payload.myImage,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSignOut: () => state,
    }
 })


 export default authSlice;