import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Comments from "./Comments";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  getSingleStory,
  clearStory,
  likeStory,
} from "../features/story/storySlice";
import MoonLoader from "react-spinners/MoonLoader";
import { FaHeart } from "react-icons/fa";

const StoryDetails = () => {
  const [liked, setLiked] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { story } = useSelector((state) => state.stories);
  const comments = story?.story?.comments;

  useEffect(() => {
    dispatch(getSingleStory(id))
      .unwrap()
      .then((story) => {
        setLiked(story.likeByCurrentUser);
      })
      .catch((error) => {
        toast.error(error.message);
      });

    return () => {
      dispatch(clearStory());
    };
  }, [id, dispatch]);

  const handleLike = () => {
    dispatch(
      likeStory({
        storyID: id,
      })
    )
      .unwrap()
      .then((story) => {
        setLiked(!liked);
        toast.success(story.message);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  if (!story) {
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
          <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
            <article className=" ">
              <header className="mb-4  ">
                <address className="flex items-center mb-6 not-italic">
                  <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                    <img
                      className="mr-4 w-16 h-16 rounded-full"
                      src={story?.story.author.avatar}
                      alt="avatar"
                    />
                    <div>
                      <Link
                        to={`/user/${story?.story.author.username}`}
                        rel="author"
                        className="text-xl font-bold text-gray-900 dark:text-white capitalize hover:underline hover:underline-offset-2"
                      >
                        {story?.story.author.name}
                      </Link>
                      <p className="  text-lg font-light">
                        @{story?.story.author.username}
                      </p>
                      {/* <p className="text-base font-light text-gray-500 dark:text-gray-400">
                        <time
                          pubdate=""
                          dateTime="2022-02-08"
                          title="February 8th, 2022"
                        >
                          Feb. 8, 2022
                        </time>
                      </p> */}
                    </div>
                  </div>
                </address>
              </header>
              <p className="lead text-xl break-keep ">{story?.story?.story}</p>
            </article>
          </div>

          <div className="stats shadow mt-10">
            <div className="stat">
              <div className="stat-figure ">
                <FaHeart
                  size={32}
                  role="button"
                  color={liked ? "red" : ""}
                  onClick={handleLike}
                />
              </div>
              <div className="stat-title">Total Likes</div>
              <div className="stat-value text-primary">
                {story?.story?.likesCount}
              </div>
            </div>
          </div>
          <Comments id={id} comments={comments} />
        </div>
      </div>
    </div>
  );
};

export default StoryDetails;
