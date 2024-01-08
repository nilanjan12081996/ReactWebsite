import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState={
    blogs:[],
    category:[],
    posts:[],
    searchedBlog:[],
    loading:false,
    error:null
}
export const getBlogs=createAsyncThunk('blogs/getblogs',
async()=>{
    const response=await axios.get('https://restapinodejs.onrender.com/api/allBlog')
    return response?.data?.data
}
)
export const getCategory=createAsyncThunk('blogs/getcategory',
    async()=>{
        const response=await axios.get('https://restapinodejs.onrender.com/api/showallcategory')
        return response?.data?.data
    }
)
export const getRPost=createAsyncThunk(
    'blogs/getRpost',
    async()=>{
        const response=await axios.get('https://restapinodejs.onrender.com/api/letest-post')
        return response?.data?.data
    }
)

export const blogSlice=createSlice(
    {
        name:"blogFetch",
        initialState,
        reducers:{

        },
        extraReducers:(builder)=>{
            builder.addCase(getBlogs.fulfilled,(state,action)=>{
                state.blogs=action.payload
                state.loading=false
                state.error=null
            }).addCase(getBlogs.pending,(state)=>{
                state.loading=true
            }).addCase(getBlogs.rejected,(state)=>{
                state.error="Somwthing Went Wrong"
            }).addCase(getCategory.fulfilled,(state,action)=>{
                state.category=action.payload
                state.loading=false
                state.error=null
            }).addCase(getCategory.pending,(state)=>{
                state.loading=true
            }).addCase(getCategory.rejected,(state)=>{
                state.error="Somwthing Went Wrong"
            }).addCase(getRPost.fulfilled,(state,action)=>{
                state.posts=action.payload
                state.loading=false
                state.error=null
            }).addCase(getRPost.pending,(state)=>{
                state.loading=true
            }).addCase(getRPost.rejected,(state)=>{
                state.error="Somwthing Went Wrong"
            })
        }
    }
)