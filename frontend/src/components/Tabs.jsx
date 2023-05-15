import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Tabs = () => {
  const { user } = useSelector((state) => state.auth);

  const location = useLocation();
  return (
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
        My Feed
      </Link>
      <Link
        className={
          location.pathname === "/my-story"
            ? "tab tab-bordered text-lg tab-active font-semibold"
            : "tab tab-bordered"
        }
        to={"/my-story"}
      >
        My Story
      </Link>
      <Link
        className={
          location.pathname === "/following"
            ? "tab tab-bordered text-lg tab-active font-semibold"
            : "tab tab-bordered"
        }
        to={"/following"}
      >
        Following
      </Link>
      <Link
        className={
          location.pathname === "/who-to-follow"
            ? "tab tab-bordered text-lg tab-active font-semibold"
            : "tab tab-bordered"
        }
        to={"/who-to-follow"}
      >
        who to follow
      </Link>
      <Link
        className={
          location.pathname === `/user/${user && user?.user.username}`
            ? "tab tab-bordered text-lg tab-active font-semibold"
            : "tab tab-bordered"
        }
        to={`/user/${user && user?.user.username}`}
      >
        Account Info
      </Link>
      <Link
        className={
          location.pathname === `trending`
            ? "tab tab-bordered text-lg tab-active font-semibold"
            : "tab tab-bordered"
        }
        to={`/trending`}
      >
        Trending
      </Link>
    </div>
  );
};

export default Tabs;
