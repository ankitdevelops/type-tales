import React, { useState } from "react";

const StoryForm = () => {
  const [content, setState] = useState("");
  const length = content.length;
  const lengthPercent = Math.ceil((content.length / 500) * 100);

  return (
    <div className="card w-full bg-base-300 shadow-xl ">
      <div className="card-body">
        <textarea
          placeholder="Tell Your Story"
          className="textarea textarea-bordered  w-full h-60 text-lg resize-none"
          value={content}
          onChange={(e) => setState(e.target.value)}
        ></textarea>
        <div>
          <button className="btn max-w-xs float-right mt-3">
            Tell Your Story
          </button>
          {length >= 1 && (
            <div
              className={
                length <= 500
                  ? "radial-progress text-primary  mt-3 float-right me-4"
                  : "radial-progress text-red-700  mt-3 float-right me-4"
              }
              style={{ "--value": lengthPercent, "--size": "3rem" }}
            >
              {length <= 500 ? length : 500 - length}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryForm;
