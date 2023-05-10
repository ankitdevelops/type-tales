import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserToFollow } from "../features/auth/authSlice";
import { getTrendingStories } from "../features/story/storySlice";
import UserItem from "./UserItem";
const RightPanel = () => {
  const { userToFollow } = useSelector((state) => state.auth);
  const { trendingStories } = useSelector((state) => state.stories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserToFollow());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTrendingStories());
  }, [dispatch]);

  return (
    <div className="md:col-span-3 hidden md:block max-h-screen sticky top-5">
      <div className="card w-full bg-base-300 shadow-xl ">
        <div className="card-body ">
          <h3 className="text-xl font-semibold mb-4 ">Trending Story</h3>
          {trendingStories &&
            trendingStories.slice(0, 5).map((story, index) => (
              <Link key={index} to={`/story/${story._id}`}>
                <p
                  className={
                    index !== 4
                      ? "border-b  border-slate-500 "
                      : "border-b  border-slate-500 last:border-b-0 "
                  }
                >
                  {story.story.substring(0, 50)}
                </p>
              </Link>
            ))}
        </div>
      </div>
      <div className="card w-full bg-base-300 shadow-xl mt-4">
        <div className="card-body">
          <h3 className="text-lg font-semibold">Who to follow</h3>
          {userToFollow &&
            userToFollow.map((user, index) => (
              <UserItem
                user={user}
                key={index}
                unFollow={false}
                follow={true}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
