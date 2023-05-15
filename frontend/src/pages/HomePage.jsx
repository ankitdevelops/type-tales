import React from "react";
import LeftPanel from "../components/LeftPanel";
import HomeFeed from "../components/HomeFeed";
import RightPanel from "../components/RightPanel";
import { useLocation } from "react-router-dom";
import FollowingFeed from "../components/FollowingFeed";
import MyStroy from "../components/MyStroy";
import Following from "../components/Following";
import ExplorePeople from "../components/ExplorePeople";
import Trending from "../components/Trending";

const HomePage = () => {
  const location = useLocation();
  return (
    <>
      <div className="container mx-auto px-4 my-4 flex flex-col min-h-screen ">
        <div className="grid md:grid-cols-12 gap-4 mx-auto ">
          <LeftPanel />
          <>
            {location.pathname === "/my-feed" ? (
              <FollowingFeed />
            ) : location.pathname === "/my-story" ? (
              <MyStroy />
            ) : location.pathname === "/following" ? (
              <Following />
            ) : location.pathname === "/who-to-follow" ? (
              <ExplorePeople />
            ) : location.pathname === "/trending" ? (
              <Trending />
            ) : (
              <HomeFeed />
            )}
          </>
          <RightPanel />
        </div>
      </div>
    </>
  );
};

export default HomePage;
