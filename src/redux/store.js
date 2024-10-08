import { configureStore } from "@reduxjs/toolkit";
import userListReducer from "./userListSlice";
import postsReducer from "./postsSlice";
import apipostsReducer from "./apipostsSlice";
import { apiSlice } from "./apiSlice";

const store = configureStore({
    reducer: {
        // here we will be adding reducers
        [apiSlice.reducerPath]: apiSlice.reducer,
        user: userListReducer,
        posts: postsReducer,
        apiPosts: apipostsReducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
})

export default store;