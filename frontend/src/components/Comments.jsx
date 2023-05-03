import React from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
// import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const Comments = ({ id, comments }) => {
  // const { story } = useSelector((state) => state.stories);
  const { commentID } = useParams();

  return (
    <section className=" bg-base-300 mt-10">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Discussion ({comments?.length})
          </h2>
        </div>
        <CommentForm
          storyID={id}
          commentID={commentID}
          isReply={commentID ? true : false}
        />
        <CommentList comments={comments} storyID={id} />
      </div>
    </section>
  );
};

export default Comments;
