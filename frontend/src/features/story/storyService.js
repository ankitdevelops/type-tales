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

const storyService = {
  createStory,
  getAllStory,
};

export default storyService;
