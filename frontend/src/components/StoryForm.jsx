import React from "react";

const StoryForm = () => {
  return (
    <div className="card w-full bg-base-300 shadow-xl ">
      <div className="card-body">
        <textarea
          placeholder="Tell Your Story"
          className="textarea textarea-bordered  w-full h-80 resize-none"
        ></textarea>
        <button className="btn max-w-xs float-right mt-3">
          Tell Your Story
        </button>
      </div>
    </div>
  );
};

export default StoryForm;
