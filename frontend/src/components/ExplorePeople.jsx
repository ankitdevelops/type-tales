import React, { useEffect } from "react";
import Tabs from "./Tabs";
import UserItem from "./UserItem";
import { useSelector, useDispatch } from "react-redux";
import { getUserToFollow } from "../features/auth/authSlice";

const ExplorePeople = () => {
  const { userToFollow } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserToFollow());
  }, [dispatch]);
  return (
    <div className="md:col-span-6 overflow-y-auto middle">
      <Tabs />
      <div className="card w-full bg-base-300 shadow-xl my-4">
        <div className="card-body block">
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

export default ExplorePeople;
