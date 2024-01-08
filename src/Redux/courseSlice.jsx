import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

import { toast } from "react-toastify"

const initialState={
    course:[],
    loading:false,
    error:null,
    status:""
}

export const getCoure=createAsyncThunk('courses',
    async()=>{
        const response=await axios.get('https://restapinodejs.onrender.com/api/course')
        return response?.data?.Courses
    })
export const applyCourse=createAsyncThunk(
    'apply',
    async({_id,  name,
        email,
        phone,
        city,
        address,
        qualification,
        programing_knowledge,
        experiance})=>{
        const res=await axios.post(`https://restapinodejs.onrender.com/api/course/apply/${_id}`,{
            name,
            email,
            phone,
            city,
            address,
            qualification,
            programing_knowledge,
            experiance
        })
        console.log(res?.data);
        console.log("Apply successFul");
        return res?.data
    }
)
export const courseSlice=createSlice(
    {
        name:'fetchCourse',
        initialState,
        reducers:{},
        extraReducers:(builder)=>{
            builder.addCase(getCoure.pending,(state)=>{
                state.loading=true
            }).addCase(getCoure.fulfilled,(state,action)=>{
                state.course=action.payload
                state.loading=false
            }).addCase(getCoure.rejected,(state)=>{
                state.error="error"
            }).addCase(applyCourse.fulfilled,(state,{payload})=>{
               
                state.status="idle"
                if(payload)
                {
                    toast.success(payload?.data?.message)
                   
                }
                else{
                    toast.error(payload?.data?.message)
                }
            })
        }
    }
)