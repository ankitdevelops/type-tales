import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { useSelector, useDispatch } from "react-redux";
import { getStoryComments } from "../features/comment/comment.slice";
import { toast } from "react-toastify";
const Comments = ({ id }) => {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.comments);

  useEffect(() => {
    dispatch(getStoryComments(id))
      .unwrap()
      .then(() => {})
      .catch((error) => {
        toast.error(error.message);
      });
    dispatch(getStoryComments(id));
  }, [id, dispatch]);

  return (
    <section className=" bg-base-300 mt-10">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Discussion ({comments?.length})
          </h2>
        </div>
        <CommentForm storyID={id} />
        <CommentList comments={comments} storyID={id} />
      </div>
    </section>
  );
};

export default Comments;
