import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import storyService from "./storyService";

const initialState = {
  stories: [],
  newStory: null,
  isLoading: true,
};

export const createStory = createAsyncThunk(
  "story/create",
  async (story, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await storyService.createStory(story, token);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || error.toString()
      );
    }
  }
);

export const getAllStory = createAsyncThunk(
  "story/getAllStory",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await storyService.getAllStory(token);
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
        state.newStory = action.payload;
        state.stories.unshift(action.payload.newStory);
      })
      .addCase(createStory.pending, (state) => {
        state.isLoading = true;
        // state.story = ;
      })
      .addCase(createStory.rejected, (state) => {
        state.isLoading = true;
        // state.story = null;
      })
      .addCase(getAllStory.fulfilled, (state, action) => {
        state.stories = action.payload;
      })
      .addCase(getAllStory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllStory.rejected, (state) => {
        state.isLoading = true;
      });
  },
});

export default storySlice.reducer;
