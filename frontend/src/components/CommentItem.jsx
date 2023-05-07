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
                src={comment?.author?.avatar}
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
          <div className="dropdown dropdown-bottom dropdown-end">
            <label tabIndex={0} className=" m-1" role="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                ></path>
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-300 rounded-box w-52"
            >
              <li>Item 1</li>
              <li>Item 2</li>
            </ul>
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
