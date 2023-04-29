import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import storyService from "./storyService";

const initialState = {
  story: null,
  isLoading: true,
};

export const createStory = createAsyncThunk(
  "story/create",
  async ({ story }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      console.log(token);
      return await storyService.createStory(story, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || error.toString()
      );
    }
  }
);

export const storySlice = createSlice({
  name: "story",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createStory.fulfilled, (state, action) => {
        state.story.push(action.payload);
      })
      .addCase(createStory.pending, (state) => {
        state.isLoading = true;
        state.story = null;
      })
      .addCase(createStory.rejected, (state) => {
        state.isLoading = true;
        state.story = null;
      });
  },
});

export default storySlice.reducer;
