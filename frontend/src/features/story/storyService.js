import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api/v1/story/";

// Create story
const createStory = async (story, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${API_URL}create`,
    {
      story,
    },
    config
  );

  return response.data;
};

// get All Story

const getAllStory = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}stories`, config);
  return response.data.stories;
};

const getSingleStory = async (token, storyID) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}${storyID}`, config);
  return response.data;
};

const getMyStory = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}my-story`, config);
  return response.data;
};

const createComment = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${API_URL}addComment`, data, config);
  return response.data;
};

const likeStory = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${API_URL}handleLike`, data, config);
  if (response.data) {
    return response.data;
  }
};

const getTrendingStories = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}trending`, config);
  return response.data;
};

// const deleteStory = async (storyID, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   const response = await axios.delete(`${API_URL}delete/${storyID}`, config);
//   return response.data;
// };

const storyService = {
  createStory,
  getAllStory,
  getSingleStory,
  getMyStory,
  createComment,
  likeStory,
  getTrendingStories,
  // deleteStory,
};

export default storyService;
