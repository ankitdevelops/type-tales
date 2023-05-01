import React from "react";
import { useLocation, Link } from "react-router-dom";
const Tabs = () => {
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
        Following
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
    </div>
  );
};

export default Tabs;
