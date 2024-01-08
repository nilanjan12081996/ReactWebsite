import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState={
    category:[],
    loading:false,
    error:null
}
export const getSingleCategory=createAsyncThunk(
    'cate',
    async(_id)=>{
        const response=await axios.get(`https://restapinodejs.onrender.com/api/category/post/${_id}`)
        console.log("props",_id);
        return response?.data?.data
    }
)
export const categorySlice=createSlice(
    {
        name:'fetchCategory',
        initialState,
        reducers:{},
        extraReducers:(builder)=>{
            builder.addCase(getSingleCategory.pending,(state)=>
            {
                state.loading=true
                state.error=null
            }).addCase(getSingleCategory.fulfilled,(state,action)=>{
                state.category=action.payload
                state.loading=false
                state.error=null
            }).addCase(getSingleCategory.rejected,(state)=>{
                state.error="Something went wrong"
            })
        }
    }
)