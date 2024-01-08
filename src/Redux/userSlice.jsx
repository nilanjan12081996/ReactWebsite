import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState={
    user:null,
    token:"",
    loading:false,
    error:null
}
export const login = createAsyncThunk("user/loginuser", async (userCredential) => {
    try {
        const res = await axios.post('https://restapinodejs.onrender.com/api/login', userCredential);
        const { user, token } = res?.data || {};
        
        if (user && token) {
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', JSON.stringify(token));
            
            return user;
        } else {
            throw new Error("Invalid response from server");
        }
    } catch (error) {
        throw error;
    }
});
export const userSlice=createSlice(
    {
        name:'user',
        initialState,
        reducers:{

        },
        extraReducers:(builder)=>{
            builder.addCase(login.pending,(state)=>{
                state.loading=true
                state.user=null
                state.error=null
            })
            builder.addCase(login.fulfilled,(state,action)=>{
                console.log('Fulfilled Action Payload:', action.payload);
                console.log(action.payload);
                state.loading=false
                state.user=action.payload
                state.error=null
                console.log('State after login.fulfilled:', state);
            })
            builder.addCase(login.rejected,(state,action)=>{
                state.loading=false
                state.user=null
                console.log(action.error.message);
                if(action.error.message)
                {
                    state.error="Access Denied Invalid Credential"
                }
                else{
                    state.error=action.error.message
                }
            })
        }
    }
)