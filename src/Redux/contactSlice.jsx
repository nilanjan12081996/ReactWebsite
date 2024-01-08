import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const initialState = {
    status: ""
}
export const contact = createAsyncThunk(
    'con',
    async ({ name,
        email,
        phone,
        message }) => {
        const res = await axios.post("https://restapinodejs.onrender.com/api/contact/create", {
            name,
            email,
            phone,
            message
        })
        console.log(res?.data);
        return res?.data
    }
)
export const contactSlice = createSlice(
    {
        name: 'createcontact',
        initialState,
        reducers: {

        },
        extraReducers: (builder) => {
            builder.addCase(contact.fulfilled, (state, { payload }) => {
                state.status = "idle"
                if (payload) {
                    toast.success(payload?.message)
                    console.log(payload?.message);
                }
                else {
                    toast.error(payload?.message)
                }
            })
        }
    }
)