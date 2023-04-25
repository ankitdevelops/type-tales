import React from "react";
import StoryForm from "./StoryForm";
import StoryList from "./StoryList";

const MiddlePanel = () => {
  return (
    <div className="md:col-span-6 overflow-y-auto middle">
      <StoryForm />
      <StoryList />
    </div>
  );
};

export default MiddlePanel;
