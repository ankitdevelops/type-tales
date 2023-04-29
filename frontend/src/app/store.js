import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import storyReducer from "../features/story/storySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    story: storyReducer,
  },
});
