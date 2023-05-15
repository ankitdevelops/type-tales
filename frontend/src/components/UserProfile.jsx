import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  getUserProfile,
  clearUserProfile,
  followUser,
  unFollowUser,
} from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import StoryList from "./StoryList";

import CommentList from "./CommentList";
import Tabs from "./Tabs";

const UserProfile = () => {
  const [buttonText, setButtonText] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const { username } = useParams();

  const { userProfile } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUserProfile(username))
      .unwrap()
      .then(() => {})
      .catch((error) => {
        toast.error(error.message);
      });
    return () => {
      dispatch(clearUserProfile());
    };
  }, [username, dispatch]);

  const followUserBtn = () => {
    dispatch(followUser(username))
      .unwrap()
      .then((user) => {
        toast.success(user.message);
        setButtonText("unfollow");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const unFollowUserBtn = () => {
    dispatch(unFollowUser(username))
      .unwrap()
      .then((user) => {
        toast.success(user.message);
        setButtonText("follow");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <>
      <Tabs />
      <div className="card w-full bg-base-200 shadow-xl my-4  ">
        <div className="card-body block">
          <div className="profile">
            <div className="flex justify-between mt-2 items-center ">
              <div className="flex items-center">
                <div className="avatar">
                  <div className="w-32 h-32 rounded-full">
                    <img
                      src={
                        userProfile?.user.avatar
                          ? userProfile?.user.avatar
                          : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                      }
                      alt="user-img"
                    />
                  </div>
                </div>
                <div className="ms-4">
                  <h6 className="text-2xl font-semibold  ">
                    {userProfile?.user.name}
                  </h6>
                  <p className="text-xl">@{userProfile?.user.username}</p>
                </div>
              </div>

              {userProfile && userProfile.user.isFollowedBYCurrentUser ? (
                <button className="btn capitalize" onClick={unFollowUserBtn}>
                  {buttonText ? `${buttonText}` : "unfollow"}
                </button>
              ) : (
                <button className="btn capitalize" onClick={followUserBtn}>
                  {buttonText ? `${buttonText}` : "follow"}
                </button>
              )}
            </div>
          </div>
          {/* stats */}
          <section className="text-center overflow-x-auto">
            <div className="stats shadow mt-5 flex-wrap stats-horizontal ">
              <div className="stat">
                <div className="stat-value text-primary">
                  {userProfile?.stories.length}
                </div>
                <div className="stat-title">Stories Created</div>
              </div>

              <div className="stat">
                <div className="stat-value text-primary ">
                  {userProfile?.user.totalComments}
                </div>
                <div className="stat-title">Comments Posted</div>
              </div>

              <div className="stat">
                <div className="stat-value text-primary">
                  {userProfile?.user.likesCount}
                </div>
                <div className="stat-title">Story Liked</div>
              </div>
              <div className="stat">
                <div className="stat-value text-primary">
                  {userProfile?.user.followers}
                </div>
                <div className="stat-title">Followers</div>
              </div>
              <div className="stat">
                <div className="stat-value text-primary">
                  {userProfile?.user.following}
                </div>
                <div className="stat-title">Following</div>
              </div>
            </div>
          </section>
          <div className="tabs  my-2">
            <Link
              className={
                location.pathname === `/user/${username}/stories` ||
                location.pathname === `/user/${username}`
                  ? "tab tab-bordered text-lg tab-active font-semibold"
                  : "tab tab-bordered"
              }
              to={`/user/${username}/stories`}
            >
              Stories
            </Link>

            <Link
              className={
                location.pathname === `/user/${username}/replies`
                  ? "tab tab-bordered text-lg tab-active font-semibold"
                  : "tab tab-bordered"
              }
              to={`/user/${username}/replies`}
            >
              Replies
            </Link>
          </div>
          {/* stories */}

          {location.pathname === `/user/${username}/stories` ? (
            <StoryList stories={userProfile && userProfile?.stories} />
          ) : location.pathname === `/user/${username}/replies` ? (
            <CommentList comments={userProfile?.replies} />
          ) : (
            <StoryList stories={userProfile && userProfile?.stories} />
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
