import React, { useEffect } from "react";
import Tabs from "./Tabs";
import { useSelector, useDispatch } from "react-redux";
import { getMyStory, clearStories } from "../features/story/storySlice";
import StoryList from "./StoryList";
import MoonLoader from "react-spinners/MoonLoader";

const MyStroy = () => {
  const { stories, status } = useSelector((state) => state.stories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyStory());
    return () => {
      dispatch(clearStories());
    };
  }, [dispatch]);

  if (status === "pending") {
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

  if (stories.length === 0) {
    return (
      <div className="md:col-span-6 overflow-y-auto middle">
        <Tabs />
        <p className="text-3xl text-center mt-10">No Stories Found</p>
      </div>
    );
  }

  return (
    <div className="md:col-span-6 overflow-y-auto middle">
      <Tabs />
      <StoryList stories={stories} />
    </div>
  );
};

export default MyStroy;
