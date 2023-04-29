import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createStory } from "../features/story/storySlice";

const StoryForm = () => {
  const [content, setState] = useState("");
  const length = content.length;
  const lengthPercent = Math.ceil((content.length / 500) * 100);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createStory({ content }))
      .unwrap()
      .then(() => {
        navigate("/my-feed");
        console.log("Story Created Successfully");
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  return (
    <div className="card w-full bg-base-300 shadow-xl ">
      <div className="card-body">
        <form action="" onSubmit={onSubmit}>
          <textarea
            placeholder="Tell Your Story"
            className="textarea textarea-bordered  w-full h-60 text-lg resize-none"
            value={content}
            onChange={(e) => setState(e.target.value)}
          ></textarea>
          <div>
            <button className="btn max-w-xs float-right mt-3" type="submit">
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
        </form>
      </div>
    </div>
  );
};

export default StoryForm;
