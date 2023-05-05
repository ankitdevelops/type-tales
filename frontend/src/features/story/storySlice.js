import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import storyService from "./storyService";

const initialState = {
  stories: [],
  newStory: null,
  story: null,
  status: "",
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

export const createComment = createAsyncThunk(
  "comment/createComment",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      console.log(data);
      return await storyService.createComment(token, data);
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
        state.status = "fulfilled";
        state.newStory = action.payload;
        state.stories.unshift(action.payload.newStory);
      })
      .addCase(createStory.pending, (state) => {
        state.status = "pending";

        state.newStory = null;
        // state.story = ;
      })
      .addCase(createStory.rejected, (state) => {
        state.status = "rejected";

        state.newStory = null;
        // state.story = null;
      })
      .addCase(getAllStory.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.stories = action.payload;
      })
      .addCase(getAllStory.pending, (state) => {
        state.status = "pending";
        state.stories = [];
      })
      .addCase(getAllStory.rejected, (state) => {
        state.status = "rejected";
        state.stories = [];
      })
      .addCase(getSingleStory.fulfilled, (state, action) => {
        state.story = action.payload;
        state.status = "fulfilled";
      })
      .addCase(getSingleStory.rejected, (state) => {
        state.status = "rejected";
        state.story = null;
      })
      .addCase(getSingleStory.pending, (state) => {
        state.status = "pending";
        state.story = null;
      })
      .addCase(getMyStory.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.stories = action.payload.stories;
      })
      .addCase(getMyStory.pending, (state, action) => {
        state.status = "pending";
        state.stories = [];
      })
      .addCase(getMyStory.rejected, (state, action) => {
        state.status = "rejected";
        state.stories = [];
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.story.story.comments.unshift(action.payload);
      })
      .addCase(createComment.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(createComment.rejected, (state, action) => {
        state.status = "rejected";
      });
  },
});
export const { clearStory, clearStories, clearNewStory } = storySlice.actions;
export default storySlice.reducer;
