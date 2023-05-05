import React from "react";

const UserItem = ({ user }) => {
  return (
    <div className="">
      <div className="flex justify-between mt-2 ">
        <div className="flex">
          <div className="avatar">
            <div className="w-14 h-14 rounded-full">
              <img
                src="https://randomuser.me/api/portraits/women/40.jpg"
                alt="avatar"
              />
            </div>
          </div>
          <div className="ms-4">
            <h6 className="text-lg font-semibold hover:underline hover:underline-offset-2 cursor-pointer">
              {user.name}
            </h6>
            <p className="text-sm">@{user.username}</p>
          </div>
        </div>
        <div className="">
          <button className="btn">follow</button>
        </div>
      </div>
    </div>
  );
};

export default UserItem;
