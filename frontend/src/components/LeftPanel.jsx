import React from "react";

const LeftPanel = () => {
  return (
    <div className="md:col-span-3 hidden md:block ">
      <div className="card w-full bg-base-300 shadow-xl ">
        <div className="card-body">
          <div className="flex">
            <div className="avatar">
              <div className="w-14 rounded-full">
                <img
                  src="https://avatars.githubusercontent.com/u/46848486?v=4"
                  alt="avatar"
                />
              </div>
            </div>
            <div className="ms-3">
              <h6 className="text-lg font-semibold hover:underline hover:underline-offset-2 cursor-pointer">
                Ankit Kumar
              </h6>
              <p className="text-sm">Full-Stack Developer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;
