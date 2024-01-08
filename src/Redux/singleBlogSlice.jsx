import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState={
    loading:false,
    singleBlog:{},
    error:null,
    comments:[],
    like:[],
    unlike:[]
   
}

export const getSingleBlog=createAsyncThunk(
    'sblog',
    async(id)=>{
        const res=await axios.get(`https://restapinodejs.onrender.com/api/blogdetails/${id}`)
       console.log("single Blog",res?.data);
        return res?.data
      
    }
)
export const getComments=createAsyncThunk(
    'com',
    async(id)=>{
        const res=await axios.get(`https://restapinodejs.onrender.com/api/comment/${id}`)
        return res?.data?.post?.comment?.comments
       
    }
)
export const createComment=createAsyncThunk(
    'comc',
    async({id,name,email,comment})=>{
        const res=await axios.post(`https://restapinodejs.onrender.com/api/blog/${id}/comment/create`,{name,email,comment})
        let resData=res?.data
        return resData
    }
)
export const likeBlog = createAsyncThunk('blog/like', async (id, thunkAPI) => {
  try {
    const response = await axios.put(`https://restapinodejs.onrender.com/api/blog/like/${id}`);
  console.log("like",response?.data);
    return response?.data?.likes; // Update the likes based on the API response
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const unlikeBlog = createAsyncThunk('blog/unlike', async (id, thunkAPI) => {
  try {
    const response = await axios.put(`https://restapinodejs.onrender.com/api/blog/unlike/${id}`);
   console.log("Unlike",response?.data);
    return response?.data?.unlikes; // Update the unlikes based on the API response
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
export const singleBlogSlice=createSlice(
    {
        name:"fetchSingleBlog",
        initialState,
        reducers:{},
        extraReducers:(builder)=>{
            builder.addCase(getSingleBlog.fulfilled,(state,action)=>{
                state.singleBlog=action.payload
                state.loading=false
                state.error=null
            }).addCase(getSingleBlog.pending,(state)=>{
                state.loading=true
            }).addCase(getSingleBlog.rejected,(state)=>{
                state.error="somwthing went wrong"
            }).addCase(getComments.pending,(state)=>{
                state.loading=true
            }).addCase(getComments.fulfilled,(state,action)=>{
                state.comments=action.payload
                state.loading=false
                state.error=null
            }).addCase(getComments.rejected,(state)=>{
                state.error="Something went wrong"
            }).addCase(createComment.fulfilled, (state, action) => {
                state.comments.push(action.payload); // Assuming the payload contains the newly created comment
                state.loading = false;
                state.error = null;
              }).addCase(likeBlog.fulfilled, (state, action) => {
                state.like = action.payload;
              })
              .addCase(unlikeBlog.fulfilled, (state, action) => {
                state.unlike = action.payload;
              });

        }
    }
)