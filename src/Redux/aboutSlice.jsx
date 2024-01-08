import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState={
    team:[],
    loading:false,
    error:null
}
export const getteam=createAsyncThunk(
    'members',
    async()=>{
        const res=await axios.get('https://restapinodejs.onrender.com/api/team')
        return res?.data?.TeamMember
    }
)
export const aboutSlice=createSlice(
    {
        name:'fetchTeam',
        initialState,
        reducers:{},
        extraReducers:(builder)=>{
            builder.addCase(getteam.pending,(state,action)=>{
                state.loading=true
                state.error=null
            }).addCase(getteam.fulfilled,(state,action)=>{
                state.loading=false
                state.team=action.payload
                state.error=null
            }).addCase(getteam.rejected,(state,action)=>{
                state.error="Something went wrong"
            })
        }
    }
)