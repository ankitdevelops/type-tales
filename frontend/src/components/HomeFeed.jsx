import React, { useEffect } from "react";
import StoryForm from "./StoryForm";
import StoryList from "./StoryList";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllStory } from "../features/story/storySlice";
import MoonLoader from "react-spinners/MoonLoader";

const HomeFeed = () => {
  const location = useLocation();

  const { stories } = useSelector((state) => state.stories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllStory());
  }, [dispatch]);

  if (stories.length === 0) {
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
      <div className="tabs  my-2">
        <Link
          className={
            location.pathname === "/"
              ? "tab tab-bordered text-lg tab-active font-semibold"
              : "tab tab-bordered"
          }
          to={"/"}
        >
          Home
        </Link>
        <Link
          className={
            location.pathname === "/my-feed"
              ? "tab tab-bordered text-lg tab-active font-semibold"
              : "tab tab-bordered"
          }
          to={"/my-feed"}
        >
          Following
        </Link>
      </div>
      {location.pathname === "/my-feed" ? (
        <>
          <StoryList />
        </>
      ) : (
        <>
          <StoryForm />
          <StoryList stories={stories} />
        </>
      )}
    </div>
  );
};

export default HomeFeed;
