import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import axios from "axios";

const initialState ={
    search_data :[],
    status:"success"
}


export const fetch_search = createAsyncThunk(
    'search',async(searchQuery)=>{
        try{
         const response = await axios.get(`https://restapinodejs.onrender.com/api/search/${searchQuery}`)
         console.log("Search Response:", response?.data);
         return response?.data
        // 
        }catch(error){
            console.log(error);
        }
    }
)

export const SearchSlice = createSlice({
    name:'seacrh',
    initialState,
    reducers:{},
    extraReducers:(builders)=>{
        builders.addCase(fetch_search.pending,(state)=>{
            state.search_data=[]
            state.status='loading'
        })
        builders.addCase(fetch_search.fulfilled,(state,{payload})=>{
            state.status='success'
            state.search_data=payload
        })
        builders.addCase(fetch_search.rejected,(state)=>{           
            state.status='error'
        })
    }
})