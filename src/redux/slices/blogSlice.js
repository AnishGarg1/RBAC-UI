import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    // blog: null,
    blogsList: [],
}

const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },
        // setBlog(state, action) {
        //     state.blog = action.payload;
        // },
        setBlogsList(state, action) {
            state.blogsList = action.payload;
        },
    }
})

export const { setLoading, setBlog, setBlogsList } = blogSlice.actions;
export default blogSlice.reducer;