import { configureStore } from "@reduxjs/toolkit"
// import { userSlice } from "./Reducer/userSlice"
import { blogSlice } from "./Redux/blogSlice"
import { courseSlice } from "./Redux/courseSlice"
import { homeslice } from "./Redux/homeSlice"
import { categorySlice } from "./Redux/categorySlice"
import { singleBlogSlice } from "./Redux/singleBlogSlice"
import { authSlice } from "./Redux/authSlice"
import { aboutSlice } from "./Redux/aboutSlice"
import { contactSlice } from "./Redux/contactSlice"
import { SearchSlice } from "./Redux/SearchSlice"

export const Store=configureStore({
    reducer:{
        // user:userSlice.reducer
        
        auth:authSlice.reducer,
        blogsPage:blogSlice.reducer,
        coursePage:courseSlice.reducer,
        homepage:homeslice.reducer,
        categoryPage:categorySlice.reducer,
        singleblogs:singleBlogSlice.reducer,
        aboutPage:aboutSlice.reducer,
        contactPage:contactSlice.reducer,
        searchPage:SearchSlice.reducer

    }
})