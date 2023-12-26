import { configureStore} from "@reduxjs/toolkit";
import authReducer from './reducers/userReducers'
import { apiSlice } from "./slices/apiSlice";
import adminReducer from './reducers/adminReducers'




export const store =configureStore({
    reducer:{
        auth:authReducer,
        adminAuth : adminReducer,
        [apiSlice.reducerPath]:apiSlice.reducer,
        
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})

export type RootState = ReturnType<typeof store.getState>