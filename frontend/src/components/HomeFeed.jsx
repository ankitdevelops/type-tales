import React from "react";
import StoryForm from "./StoryForm";
import StoryList from "./StoryList";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
const HomeFeed = () => {
  const location = useLocation();

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
          <StoryList />
        </>
      )}
    </div>
  );
};

export default HomeFeed;
