import React from "react";
import StoryItem from "./StoryItem";

const StoryList = ({ stories }) => {
  console.log("first", Array.isArray(stories));
  return (
    <>
      {stories &&
        stories?.map((story, index) => <StoryItem key={index} story={story} />)}
    </>
  );
};

export default StoryList;
