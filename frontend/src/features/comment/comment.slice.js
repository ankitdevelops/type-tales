import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commentService from "./comment.service";

const initialState = {
  comments: [],
  comment: null,
  newReply: null,
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

// export const createComment = createAsyncThunk(
//   "comment/createComment",
//   async (data, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token;
//       console.log(data);
//       return await commentService.createComment(token, data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || error.message || error.toString()
//       );
//     }
//   }
// );

export const addCommentReply = createAsyncThunk(
  "comment/addCommentReply",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await commentService.addCommentReply(token, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || error.toString()
      );
    }
  }
);

export const getCommentByID = createAsyncThunk(
  "comment/getCommentByID",
  async (commentID, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await commentService.getCommentByID(token, commentID);
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
      .addCase(addCommentReply.fulfilled, (state, action) => {
        state.comment.comments.unshift(action.payload);
        console.log(action.payload);
      })
      .addCase(getCommentByID.fulfilled, (state, action) => {
        state.comment = action.payload;
      });
  },
});

export default commentSlice.reducer;
