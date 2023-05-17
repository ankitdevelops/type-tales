import React from "react";
import { Link } from "react-router-dom";

const CommentItem = ({ comment, storyID }) => {
  return (
    <Link to={`/story/${storyID}/comment/${comment?._id}`} id="RouterNavLink">
      <article className={"card card-body  bg-base-100 p-6 mb-6 text-base "}>
        <footer className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
              <img
                className="mr-2 w-6 h-6 rounded-full"
                src={
                  comment?.author?.avatar
                    ? comment?.author?.avatar
                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                }
                alt="avatar"
              />
              {comment?.author?.name}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <time pubdate="" dateTime="2022-02-08" title="February 8th, 2022">
                {comment?.createdAt}
              </time>
            </p>
          </div>
        </footer>
        <p className="text-gray-500 dark:text-gray-400">{comment?.content}</p>
        <div className="flex items-center mt-4 space-x-4">
          <p>Click To view Replies</p>
        </div>
      </article>
    </Link>
  );
};

export default CommentItem;
