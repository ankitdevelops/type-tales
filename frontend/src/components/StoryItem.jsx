import React from "react";
import { FaHeart, FaRegComment } from "react-icons/fa";
import { Link } from "react-router-dom";
const StoryItem = ({ story }) => {
  return (
    <div className="card w-full bg-base-300 shadow-xl my-4">
      <Link to={`/story/${story._id}`}>
        <div className="card-body ">
          <div className="flex items-start ">
            <img
              className="w-12 h-12 rounded-full object-cover mr-4 shadow"
              src="https://randomuser.me/api/portraits/women/55.jpg"
              alt="avatar"
            />
            <div className="">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold capitalize">
                  {story?.author?.name}
                </h2>
                {/* <small className="text-sm ">22h ago</small> */}
              </div>
              <p className="">Joined 12 SEP 2012. </p>
            </div>
          </div>
          <div>
            <p className="mt-3  text-lg">{story.story.substring(0, 200)}...</p>
            <div className="mt-4 flex items-center">
              <div className="flex   text-sm mr-3">
                <FaHeart size={20} color="red" />
                <span className="ml-2">{story?.likes?.length}</span>
              </div>
              <div className="flex  text-sm mr-3">
                <FaRegComment size={20} />
                <span className="ml-2">{story?.comments?.length}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default StoryItem;
