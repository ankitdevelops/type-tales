import axios from "axios";

const API_URL = "https://type-tales.up.railway.app/api/v1/auth/";

// Register User

const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}signup`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Login User

const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}login`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Logout User
const logout = () => localStorage.removeItem("user");

// Following Users

const getFollowingUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/listFollowing`, config);

  if (response.data) {
    return response.data;
  }
};

// User to Follow

const getUserToFollow = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/list`, config);

  if (response.data) {
    return response.data;
  }
};

// followUser

const followUser = async (username, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${API_URL}follow/${username}`, {}, config);
  if (response.data) {
    return response.data;
  }
};

const unFollowUser = async (username, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${API_URL}/unfollow/${username}`,
    {},
    config
  );

  if (response.data) {
    return response.data;
  }
};

const getFollowingFeed = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}following/stories`, config);

  if (response.data) {
    return response.data;
  }
};

const uploadProfilePhoto = async (image, token) => {
  const config = {
    "Content-Type": "multipart/form-data",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${API_URL}user/addPhoto`, image, config);
  if (response.data) {
    return response.data;
  }
};

const getUserProfile = async (username, token) => {
  const config = {
    "Content-Type": "multipart/form-data",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}user/${username}`, config);
  if (response) {
    return response.data;
  }
};

const authService = {
  registerUser,
  loginUser,
  logout,
  getFollowingUsers,
  getUserToFollow,
  followUser,
  unFollowUser,
  getFollowingFeed,
  uploadProfilePhoto,
  getUserProfile,
};

export default authService;
