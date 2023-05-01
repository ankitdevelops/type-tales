import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import storyService from "./storyService";

const initialState = {
  stories: [],
  newStory: null,
  story: null,
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

export const getSingleStory = createAsyncThunk(
  "story/getSingleStory",
  async (storyId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await storyService.getSingleStory(token, storyId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || error.toString()
      );
    }
  }
);

export const getMyStory = createAsyncThunk(
  "story/getMyStory",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await storyService.getMyStory(token);
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
  reducers: {
    clearStory: (state) => {
      state.story = null;
    },
    clearStories: (state) => {
      state.stories = [];
    },
    clearNewStory: (state) => {
      state.newStory = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createStory.fulfilled, (state, action) => {
        state.newStory = action.payload;
        state.stories.unshift(action.payload.newStory);
      })
      .addCase(createStory.pending, (state) => {
        state.isLoading = true;
        state.newStory = null;
        // state.story = ;
      })
      .addCase(createStory.rejected, (state) => {
        state.isLoading = true;
        state.newStory = null;
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
      })
      .addCase(getSingleStory.fulfilled, (state, action) => {
        state.story = action.payload;
      })
      .addCase(getSingleStory.rejected, (state) => {
        state.story = null;
      })
      .addCase(getSingleStory.pending, (state) => {
        state.story = null;
      })
      .addCase(getMyStory.fulfilled, (state, action) => {
        state.stories = action.payload.stories;
      });
  },
});
export const { clearStory, clearStories, clearNewStory } = storySlice.actions;
export default storySlice.reducer;
