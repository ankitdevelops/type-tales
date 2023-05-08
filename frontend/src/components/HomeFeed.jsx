import React, { useEffect } from "react";
import StoryForm from "./StoryForm";
import StoryList from "./StoryList";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllStory, clearStories } from "../features/story/storySlice";

import MoonLoader from "react-spinners/MoonLoader";
import Tabs from "./Tabs";

const HomeFeed = () => {
  const location = useLocation();

  const { stories, status } = useSelector((state) => state.stories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllStory());
    return () => {
      dispatch(clearStories());
    };
  }, [dispatch]);

  if (status === "pending") {
    return (
      <div className="md:col-span-6 overflow-y-auto middle">
        <StoryForm />
        <MoonLoader
          color="#fff"
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
          className="mt-5 mx-auto"
        />
      </div>
    );
  }
  if (stories.length === 0) {
    return (
      <div className="md:col-span-6 overflow-y-auto middle">
        <Tabs />
        <StoryForm />
        <p className="text-3xl text-center mt-10">No Stories Found</p>
      </div>
    );
  }

  return (
    <div className="md:col-span-6 overflow-y-auto middle">
      <Tabs />
      <StoryForm />
      <StoryList stories={stories} />
    </div>
  );
};

export default HomeFeed;
