import React, { useEffect } from "react";
import Tabs from "./Tabs";
import { useSelector, useDispatch } from "react-redux";
import { getFollowingUsers } from "../features/auth/authSlice";
import UserItem from "./UserItem";
import { Link } from "react-router-dom";
const Following = () => {
  const dispatch = useDispatch();
  const { user, following } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getFollowingUsers());
  }, [dispatch]);

  return (
    <div className="md:col-span-6 overflow-y-auto middle">
      <Tabs />
      <div className="card w-full bg-base-300 shadow-xl my-4">
        <div className="card-body block">
          {following &&
            following.map((user, index) => (
              <UserItem
                user={user}
                key={index}
                unFollow={true}
                follow={false}
                className="mb-24"
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Following;
