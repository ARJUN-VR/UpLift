import { createSlice,PayloadAction } from "@reduxjs/toolkit";


const storedAdminInfo = localStorage.getItem('adminInfo') ?? ''
const parsedAdminInfo = storedAdminInfo?JSON.parse(storedAdminInfo) : null

const initialState = {
    adminInfo : parsedAdminInfo
}

const adminAuthSlice = createSlice({
    name:'adminAuth',
    initialState,
    reducers:{
        setCredentials:(state,action:PayloadAction<string>)=>{
            state.adminInfo = action.payload
            localStorage.setItem('adminInfo',JSON.stringify(action.payload))
        },
        logout:(state)=>{
            state.adminInfo = null
            localStorage.removeItem('adminInfo')
        }
    }
})

export const { setCredentials,logout} =adminAuthSlice.actions

export default adminAuthSlice.reducer