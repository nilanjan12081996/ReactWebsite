import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { toast } from "react-toastify"

const initialState={
    user:{},
    isloggedIn:false,
    status:"",
    setToken:"",
    redirectTo:"",
    redirectToo:""
}
export const register=createAsyncThunk(
    'signup',
    async(formData)=>{
        const res=await axios.post("https://restapinodejs.onrender.com/api/register",formData)
        let resData=res?.data
        return resData
    }
)
export const login=createAsyncThunk(
    'signin',
    async({email,password})=>{
        const res=await axios.post("https://restapinodejs.onrender.com/api/login",{
            email,
            password
        })
        let resData=res?.data
        console.log(resData);
        return resData
    }
)
export const authSlice=createSlice(
    {
        name:'Authentication',
        initialState,
        reducers:{
            reset_redirectTo:(state,{payload})=>{
                state.redirectTo=payload
            },
            reset_redirectToo:(state,{payload})=>{
                state.redirectToo=payload
            },
            check_token:(state,{payload})=>{
                    const token=localStorage.getItem("token")
                    if(token!==null && token!==undefined&& token!=="")
                    state.isloggedIn=true
            },
            handleLoggedout:(state,{payload})=>{
                    localStorage.removeItem("token")
                    localStorage.removeItem("name")
                    state.isloggedIn=false
            },
            handleregister:(state,{payload})=>{
                localStorage.removeItem("name")
            }
        },
        extraReducers:(builder)=>{
            builder.addCase(register.pending,(state,{payload})=>{
                state.status="Loading.."
            }).addCase(register.fulfilled,(state,{payload})=>{
                state.status='idle'
                if(payload?.success)
                {
                    state.isloggedIn=true
                    localStorage.setItem("name",payload?.data?.name)
                    localStorage.setItem("email",payload?.data?.email)
                    localStorage.setItem("photo",payload?.data?.photo)
                    
                    // localStorage.setItem("token",payload?.token)
                    state.redirectToo='/login'
                    toast(payload?.data?.message)
                }
                else{
                    toast(payload?.data?.message)
                   
                }
            }).addCase(register.rejected,(state)=>{
                state.status="idle"
            }).addCase(login.pending,(state,{payload})=>{
                state.status="Loading..."
            }).addCase(login.fulfilled,(state,{payload})=>{
                if(payload?.status===200){
                    state.status="idle"
                    state.redirectTo='/'
                    localStorage.setItem("name",payload?.user?.name)
                    console.log("Name from payload:", payload?.user?.name);
                    localStorage.setItem("token",payload?.token)
                    localStorage.setItem("photo",payload?.user?.photo)
                    // state.isloggedIn=true
                    // console.log(state.isloggedIn);
                }
            }).addCase(login.rejected,(state,action)=>{
                console.log('Login error:', action.error);
                state.status="idle"
            })


        }
    }
   
)
export const {reset_redirectTo,check_token,handleLoggedout,reset_redirectToo,handleRegister}= authSlice.actions;