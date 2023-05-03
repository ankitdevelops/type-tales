import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api/v1/story/";

const getStoryComments = async (token, storyID) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}comment/${storyID}`, config);
  return response.data;
};

// const createComment = async (token, data) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   const response = await axios.post(`${API_URL}addComment`, data, config);
//   return response.data;
// };

const addCommentReply = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    `${API_URL}/comment/addReply`,
    data,
    config
  );
  return response.data;
};

const getCommentByID = async (token, commentID) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}comment/${commentID}`, config);
  return response.data;
};

const commentService = {
  getStoryComments,
  // createComment,
  addCommentReply,
  getCommentByID,
};

export default commentService;
