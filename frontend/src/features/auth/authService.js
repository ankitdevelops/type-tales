import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api/v1/auth/";

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

const authService = {
  registerUser,
  loginUser,
  logout,
  getFollowingUsers,
  getUserToFollow,
};

export default authService;
