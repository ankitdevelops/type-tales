import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FaHandPointLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getCommentByID } from "../features/comment/comment.slice";
import { toast } from "react-toastify";
import Comments from "./Comments";
import MoonLoader from "react-spinners/MoonLoader";

const CommentsDetails = () => {
  const { storyID, commentID } = useParams();

  const dispatch = useDispatch();
  const { comment } = useSelector((state) => state.comments);

  useEffect(() => {
    dispatch(getCommentByID(commentID))
      .unwrap()
      .then(() => {})
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
      });
  }, [commentID, dispatch]);

  if (!comment) {
    return (
      <div className="md:col-span-6 mt-5 middle mx-auto">
        <MoonLoader
          color="#fff"
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }
  return (
    <div className="md:col-span-6 overflow-y-auto middle">
      <div className="card w-full bg-base-300 shadow-xl my-4">
        <div className="card-body block">
          <div className="btn-group grid grid-cols-1">
            <Link to="" className="btn  mb-5 flex items-center">
              <FaHandPointLeft size={26} className="mr-3" />
              Back To Story
            </Link>
          </div>
          <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
            <article className=" ">
              <header className="mb-4  ">
                <address className="flex items-center mb-6 not-italic">
                  <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                    <img
                      className="mr-4 w-16 h-16 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                      alt="Jese Leos"
                    />
                    <div>
                      <Link
                        to="/user"
                        rel="author"
                        className="text-xl font-bold text-gray-900 dark:text-white capitalize"
                      >
                        {comment?.author?.name}
                      </Link>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <time
                          pubdate=""
                          dateTime="2022-02-08"
                          title="February 8th, 2022"
                        >
                          {comment?.createdAt}
                        </time>
                      </p>
                    </div>
                  </div>
                </address>
              </header>
              <p className="lead text-xl break-keep ">{comment?.content}</p>
            </article>
          </div>
          <Comments id={storyID} comments={comment?.comments} />
        </div>
      </div>
    </div>
  );
};

export default CommentsDetails;
