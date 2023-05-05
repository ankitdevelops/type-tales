import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserToFollow } from "../features/auth/authSlice";
import UserItem from "./UserItem";
const RightPanel = () => {
  const [content, setContent] = useState(
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et libero ut mi mattis blandit. Proin vel nisl ut enim commodo viverra nec a felis. Sed pretium, mauris eu auctor lacinia, ligula sapien ullamcorper sapien, a luctus turpis sem non est.`
  );
  const { userToFollow } = useSelector((state) => state.auth);
  const { stories } = useSelector((state) => state.stories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserToFollow());
  }, [dispatch]);

  return (
    <div className="md:col-span-3 hidden md:block max-h-screen sticky top-5">
      <div className="card w-full bg-base-300 shadow-xl ">
        <div className="card-body ">
          <h3 className="text-xl font-semibold mb-4 ">Featured Story</h3>
          {stories &&
            stories.slice(0, 5).map((story, index) => (
              <Link key={index}>
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
