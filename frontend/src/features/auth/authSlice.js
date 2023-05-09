import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import authService from "./authService";
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  following: [],
  userToFollow: [],
  status: "",
  followingFeed: [],
  userProfile: null,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user, thunkAPI) => {
    try {
      return await authService.registerUser(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || error.toString()
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user, thunkAPI) => {
    try {
      return await authService.loginUser(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || error.toString()
      );
    }
  }
);

export const logout = createAction("auth/logout", () => {
  authService.logout();

  return {};
});

export const getFollowingUsers = createAsyncThunk(
  "auth/getFollowingUsers",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await authService.getFollowingUsers(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || error.toString()
      );
    }
  }
);

export const followUser = createAsyncThunk(
  "auth/followUser",
  async (username, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await authService.followUser(username, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || error.toString()
      );
    }
  }
);

export const uploadProfilePhoto = createAsyncThunk(
  "auth/uploadProfilePhoto",
  async (image, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await authService.uploadProfilePhoto(image, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || error.toString()
      );
    }
  }
);

export const unFollowUser = createAsyncThunk(
  "auth/unFollowUser",
  async (username, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await authService.unFollowUser(username, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || error.toString()
      );
    }
  }
);

export const getUserToFollow = createAsyncThunk(
  "auth/getUserToFollow",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await authService.getUserToFollow(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || error.toString()
      );
    }
  }
);

export const getFollowingFeed = createAsyncThunk(
  "auth/getFollowingFeed",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await authService.getFollowingFeed(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || error.toString()
      );
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "auth/getUserProfile",
  async (username, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await authService.getUserProfile(username, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || error.toString()
      );
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
    clearUserProfile: (state) => {
      state.userProfile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getFollowingUsers.fulfilled, (state, action) => {
        state.following = action.payload;
      })
      .addCase(getUserToFollow.fulfilled, (state, action) => {
        state.userToFollow = action.payload;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.following.unshift(action.payload.user);
        state.message = action.payload.message;
        state.status = "fulfilled";
        state.userToFollow = state.userToFollow.filter(
          (user) => user.username !== action.payload.user.username
        );
      })
      .addCase(followUser.pending, (state) => {
        state.status = "pending";
      })
      .addCase(followUser.rejected, (state, action) => {
        state.status = "rejected";
      })
      .addCase(unFollowUser.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(unFollowUser.rejected, (state, action) => {
        state.status = "rejected";
      })
      .addCase(unFollowUser.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.following = state.following.filter(
          (user) => user.username !== action.payload.user.username
        );
        state.userToFollow.unshift(action.payload.user);
      })
      .addCase(getFollowingFeed.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.followingFeed = action.payload;
      })
      .addCase(getFollowingFeed.pending, (state, action) => {
        state.status = "pending";
        state.followingFeed = [];
      })
      .addCase(getFollowingFeed.rejected, (state, action) => {
        state.status = "rejected";
        state.followingFeed = [];
      })
      .addCase(uploadProfilePhoto.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.user.user.avatar = action.payload.avatarURL;
      })
      .addCase(uploadProfilePhoto.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(uploadProfilePhoto.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.userProfile = action.payload;
        state.status = "fulfilled";
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.status = "rejected";
      })
      .addCase(getUserProfile.pending, (state, action) => {
        state.status = "pending";
      });
  },
});
export const { clearUserProfile } = authSlice.actions;
export default authSlice.reducer;
