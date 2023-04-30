import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Comments from "./Comments";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { getSingleStory, clearStory } from "../features/story/storySlice";
import MoonLoader from "react-spinners/MoonLoader";

const StoryDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { story } = useSelector((state) => state.stories);
  useEffect(() => {
    dispatch(getSingleStory(id))
      .unwrap()
      .then(() => {})
      .catch((error) => {
        toast.error(error.message);
      });
    return () => {
      dispatch(clearStory());
    };
  }, [id, dispatch]);

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
                      src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                      alt="Jese Leos"
                    />
                    <div>
                      <Link
                        to="sd"
                        rel="author"
                        className="text-xl font-bold text-gray-900 dark:text-white capitalize"
                      >
                        {story?.story.author.name}
                      </Link>
                      {/* <p className="text-base font-light text-gray-500 dark:text-gray-400">
                        Graphic Designer, educator &amp; CEO Flowbite
                      </p> */}
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
              <p className="lead">{story?.story?.story}</p>
            </article>
          </div>
          <Comments />
        </div>
      </div>
    </div>
  );
};

export default StoryDetails;
