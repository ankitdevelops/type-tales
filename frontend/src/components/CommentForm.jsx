import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createComment } from "../features/story/storySlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addCommentReply } from "../features/comment/comment.slice";
const CommentForm = ({ storyID, isReply, commentID }) => {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    if (isReply && content !== "" && commentID) {
      const data = {
        content,
        commentID,
      };
      dispatch(addCommentReply(data))
        .unwrap()
        .then(() => {
          setContent("");
          navigate(`/story/${storyID}/comment/${commentID}`);
          toast.success("Reply Added Successfully");
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }

    if (
      content !== "" &&
      storyID &&
      isReply === false &&
      commentID === undefined
    ) {
      const data = {
        content,
        storyID,
      };
      dispatch(createComment(data))
        .unwrap()
        .then(() => {
          setContent("");
          navigate(`/story/${storyID}`);
          toast.success("Comment Created Successfully");
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }
  };

  return (
    <>
      <form className="mb-6" onSubmit={onSubmit}>
        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <label htmlFor="comment" className="sr-only">
            Your comment
          </label>
          <textarea
            id="comment"
            rows={6}
            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
            placeholder="Write a comment..."
            required=""
            // defaultValue={""}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit" className="btn">
          Post comment
        </button>
      </form>
    </>
  );
};

export default CommentForm;
