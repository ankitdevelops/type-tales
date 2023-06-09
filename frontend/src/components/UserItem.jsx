import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unFollowUser } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const UserItem = ({ user, unFollow, follow }) => {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handelButtonClick = () => {
    if (unFollow === false && follow === true) {
      dispatch(followUser(user.username))
        .unwrap()
        .then((user) => {
          toast.success(user.message);
        })
        .catch((error) => {
          console.log(error);
          toast.error(error);
        });
    }
    if (unFollow === true && follow === false) {
      dispatch(unFollowUser(user.username))
        .unwrap()
        .then((user) => {
          toast.success(user.message);
        })
        .catch((error) => {
          console.log(error);
          toast.error(error);
        });
    }
  };

  return (
    // <div className="">
    <div className="flex justify-between mt-3 ">
      <div className="flex">
        <div className="avatar">
          <div className="w-14 h-14 rounded-full">
            <img
              src={
                user.avatar
                  ? user?.avatar
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              }
              alt="avatar"
            />
          </div>
        </div>
        <div className="ms-4">
          <Link to={`/user/${user.username}`}>
            <h6 className="text-lg font-semibold hover:underline hover:underline-offset-2 ">
              {user.name}
            </h6>
          </Link>
          <p className="text-sm">@{user.username}</p>
        </div>
      </div>
      <div className="">
        <button
          className="btn capitalize"
          onClick={handelButtonClick}
          disabled={status === "pending"}
        >
          {unFollow ? "Unfollow" : "Follow"}
        </button>
      </div>
    </div>
    // </div>
  );
};

export default UserItem;
