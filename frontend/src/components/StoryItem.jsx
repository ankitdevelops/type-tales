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
              src={
                story?.author?.avatar
                  ? story?.author?.avatar
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              }
              alt="avatar"
            />
            <div className="">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold capitalize">
                  {story?.author?.name}
                </h2>
                
              </div>
              <p className="text-sm ">@{story?.author.username}</p>
            </div>
          </div>
          <div>
            <p className="mt-3  text-lg">{story.story.substring(0, 200)}...</p>
            <div className="mt-4 flex items-center">
              <div className="flex   text-sm mr-3">
                <FaHeart size={20} color="red" />
                <span className="ml-2">{story.likesCount}</span>
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
