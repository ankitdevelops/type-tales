import React from "react";
import LeftPanel from "../components/LeftPanel";
import RightPanel from "../components/RightPanel";
import HomeFeed from "../components/HomeFeed";
import StoryDetails from "../components/StoryDetails";

const StoryDetailsPage = () => {
  return (
    <div className="container mx-auto px-4 my-4  flex flex-col min-h-screen">
      <div className="grid md:grid-cols-12 gap-4 mx-auto ">
        <LeftPanel />
        <StoryDetails />
        <RightPanel />
      </div>
    </div>
  );
};

export default StoryDetailsPage;
