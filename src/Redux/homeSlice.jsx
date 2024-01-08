import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState={
    banner:[],
    service:[],
    testi:[],
    loading:false,
    error:null
}
export const getBanner=createAsyncThunk(
    'ban',
    async()=>{
        const response=await axios.get("https://restapinodejs.onrender.com/api/banner")
        return response?.data?.bannerdata
    }
)
export const getService=createAsyncThunk(
    'ser',
    async()=>{
        const ser = await axios.get("https://restapinodejs.onrender.com/api/service")
        return ser?.data?.data
    }
)
export const getTesti= createAsyncThunk(
    'tes',
    async()=>{
        const test = await axios.get("https://restapinodejs.onrender.com/api/testimonial")
        return test?.data?.testimonials
    }
)
export const homeslice=createSlice({
    name:'fetchHomedata',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getBanner.pending,(state)=>{
            state.loading=true
            state.error=null
        }).addCase(getBanner.fulfilled,(state,action)=>{
            state.banner=action.payload
            state.loading=false
        }).addCase(getBanner.rejected,(state)=>{
            state.error="Something Went Wrong"
        }).addCase(getService.pending,(state)=>{
            state.loading=true
            state.error=null
        }).addCase(getService.fulfilled,(state,action)=>{
            state.service=action.payload
            state.loading=false
        }).addCase(getService.rejected,(state)=>{
            state.error="Something Went Wrong"
        }).addCase(getTesti.pending,(state)=>{
            state.loading=true
            state.error=null
        }).addCase(getTesti.fulfilled,(state,action)=>{
            state.testi=action.payload
            state.loading=false
        }).addCase(getTesti.rejected,(state)=>{
            state.error="Something Went Wrong"
        })
    }

})
