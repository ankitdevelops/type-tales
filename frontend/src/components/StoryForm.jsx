import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createStory } from "../features/story/storySlice";
import { toast } from "react-toastify";
const StoryForm = () => {
  const [content, setContent] = useState("");
  const length = content.length;
  const lengthPercent = Math.ceil((content.length / 500) * 100);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createStory(content))
      .unwrap()
      .then(() => {
        setContent("");
        navigate(`/`);
        toast.success("Post Created Successfully");
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
            className="textarea textarea-bordered  w-full h-40 text-lg resize-none border-0"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <div>
            <button
              className="btn max-w-xs float-right mt-3"
              type="submit"
              disabled={content.length >= 500}
            >
              Share Now
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
