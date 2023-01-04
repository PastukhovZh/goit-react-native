import { combineReducers, configureStore } from "@reduxjs/toolkit";

import auth from './auth/authReducer'

const rootReducer = combineReducers({
    [auth.name]: auth.reducer,

})

export const store = configureStore({
    reducer: rootReducer
})