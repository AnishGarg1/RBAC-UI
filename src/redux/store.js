import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import blogSlice from "./slices/blogSlice";
import userSlice from "./slices/userSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        blog: blogSlice,
        user: userSlice,
    },
})