import React, { useEffect } from "react";
import StoryItem from "./StoryItem";

const StoryList = ({ stories }) => {
  return (
    <>
      {stories &&
        stories.map((story, index) => <StoryItem key={index} story={story} />)}
    </>
  );
};

export default StoryList;
