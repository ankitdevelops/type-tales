import React, { useEffect } from "react";
import StoryItem from "./StoryItem";
import { useSelector, useDispatch } from "react-redux";
import { getAllStory } from "../features/story/storySlice";
const StoryList = () => {
  const { stories } = useSelector((state) => state.stories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllStory());
  }, [dispatch]);

  return (
    <>
      {stories &&
        stories.map((story, index) => <StoryItem key={index} story={story} />)}
    </>
  );
};

export default StoryList;
