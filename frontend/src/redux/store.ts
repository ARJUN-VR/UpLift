import { configureStore } from "@reduxjs/toolkit";
import authReducer from './reducers/userReducers'
import { apiSlice } from "./slices/apiSlice";
export const store =configureStore({
    reducer:{
        auth:authReducer,
        [apiSlice.reducerPath]:apiSlice.reducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})

export type RootState = ReturnType<typeof store.getState>