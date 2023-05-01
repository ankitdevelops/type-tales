import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import storyReducer from "../features/story/storySlice";
import commentReducer from "../features/comment/comment.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    stories: storyReducer,
    comments: commentReducer,
  },
});
