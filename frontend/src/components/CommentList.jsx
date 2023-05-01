import React from "react";
import { Link } from "react-router-dom";
import CommentItem from "./CommentItem";

const CommentList = ({ comments, storyID }) => {
  return (
    <>
      {comments &&
        comments.map((comment, index) => (
          <div key={index}>
            <CommentItem comment={comment} key={index} storyID={storyID} />
            <ul>
              {comment.replies.map((reply, index) => (
                <CommentItem
                  comment={reply}
                  isReply={true}
                  key={index}
                  storyID={storyID}
                />
              ))}
            </ul>
          </div>
        ))}
    </>
  );
};

export default CommentList;
