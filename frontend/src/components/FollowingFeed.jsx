import React, { useEffect } from "react";
import Tabs from "./Tabs";
import StoryList from "./StoryList";
import { useSelector, useDispatch } from "react-redux";
import { getFollowingFeed } from "../features/auth/authSlice";
import MoonLoader from "react-spinners/MoonLoader";

const FollowingFeed = () => {
  const dispatch = useDispatch();
  const { followingFeed, status } = useSelector((state) => state.auth);

  console.log(followingFeed);
  useEffect(() => {
    dispatch(getFollowingFeed());
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

  if (followingFeed.length === 0) {
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
      <StoryList stories={followingFeed} />
    </div>
  );
};

export default FollowingFeed;
