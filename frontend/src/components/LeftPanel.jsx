import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFollowingUsers } from "../features/auth/authSlice";
import UserItem from "./UserItem";
const LeftPanel = () => {
  const dispatch = useDispatch();
  const { user, following } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getFollowingUsers());
  }, [dispatch]);

  return (
    <div className="md:col-span-3 hidden md:block  max-h-screen sticky top-5">
      {user && (
        <>
          <div className="card w-full bg-base-300 shadow-xl ">
            <div className="card-body">
              <div className="flex">
                <div className="avatar">
                  <div className="w-14 rounded-full">
                    <img
                      src="https://randomuser.me/api/portraits/women/40.jpg"
                      alt="avatar"
                    />
                  </div>
                </div>
                <div className="ms-3">
                  <h6 className="text-lg font-semibold hover:underline hover:underline-offset-2 cursor-pointer">
                    {user && user.user.name}
                  </h6>
                  <p className="text-sm">Full-Stack Developer</p>
                </div>
              </div>
            </div>
          </div>
          <div className="card w-full bg-base-300 shadow-xl mt-4">
            <div className="card-body">
              <h3 className="text-lg font-semibold">Following</h3>
              {following &&
                following.map((user, index) => (
                  <UserItem
                    user={user}
                    key={index}
                    unFollow={true}
                    follow={false}
                  />
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LeftPanel;
