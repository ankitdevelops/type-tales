import React from "react";
import { Link } from "react-router-dom";
import CommentItem from "./CommentItem";

const CommentList = ({ comments, storyID }) => {
  return (
    <>
      {comments &&
        comments.map((comment, index) => (
          <CommentItem comment={comment} key={index} storyID={storyID} />
        ))}
    </>
  );
};

export default CommentList;
