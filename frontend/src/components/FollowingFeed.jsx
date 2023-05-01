import React from "react";
import Tabs from "./Tabs";
import StoryList from "./StoryList";

const FollowingFeed = () => {
  return (
    <div className="md:col-span-6 overflow-y-auto middle">
      <Tabs />
      <h1>Following Feed</h1>
    </div>
  );
};

export default FollowingFeed;
