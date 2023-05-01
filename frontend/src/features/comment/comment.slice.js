import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commentService from "./comment.service";

const initialState = {
  comments: [],
};

export const getStoryComments = createAsyncThunk(
  "comment/getStoryComments",
  async (storyId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await commentService.getStoryComments(token, storyId);
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
      return await commentService.createComment(token, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || error.toString()
      );
    }
  }
);

export const addCommentReply = createAsyncThunk(
  "comment/addCommentReply",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      console.log(data);
      return await commentService.addCommentReply(token, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || error.toString()
      );
    }
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStoryComments.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.comments.unshift(action.payload.newComment);
      })
      .addCase(addCommentReply.fulfilled, (state, action) => {
        state.comments.replies.unshift(action.payload.newComment);
        console.log(action.payload);
      });
  },
});

export default commentSlice.reducer;
