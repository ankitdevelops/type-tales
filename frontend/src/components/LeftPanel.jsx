import React from "react";
import { useSelector } from "react-redux";
const LeftPanel = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="md:col-span-3 hidden md:block  max-h-screen sticky top-5">
      {user && (
        <div className="card w-full bg-base-300 shadow-xl ">
          <div className="card-body">
            <div className="flex">
              <div className="avatar">
                <div className="w-14 rounded-full">
                  <img
                    src="https://randomuser.me/api/portraits/women/40.jpg"
                    alt="avatar"
                  />
                </div>
              </div>
              <div className="ms-3">
                <h6 className="text-lg font-semibold hover:underline hover:underline-offset-2 cursor-pointer">
                  {user && user.user.name}
                </h6>
                <p className="text-sm">Full-Stack Developer</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftPanel;
