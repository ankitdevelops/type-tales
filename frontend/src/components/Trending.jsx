import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTrendingStories } from "../features/story/storySlice";
import { Link } from "react-router-dom";
import Tabs from "./Tabs";
import MoonLoader from "react-spinners/MoonLoader";

const Trending = () => {
  const { trendingStories } = useSelector((state) => state.stories);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTrendingStories());
  }, [dispatch]);

  if (trendingStories.length === 0) {
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
  return (
    <>
      <div className="md:col-span-6 overflow-y-auto middle">
        <Tabs />
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
      </div>
    </>
  );
};

export default Trending;
