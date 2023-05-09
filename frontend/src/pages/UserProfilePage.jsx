import React from "react";
import LeftPanel from "../components/LeftPanel";
import RightPanel from "../components/RightPanel";
import UserProfile from "../components/UserProfile";
const UserProfilePage = () => {
  return (
    <div className="container mx-auto px-4 my-4 ">
      <div className="grid md:grid-cols-12 gap-4 mx-auto ">
        <LeftPanel />
        <div className="md:col-span-6 overflow-y-auto middle">
          <UserProfile />
        </div>
        <RightPanel />
      </div>
    </div>
  );
};

export default UserProfilePage;
