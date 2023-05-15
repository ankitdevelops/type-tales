import React from "react";
import LeftPanel from "../components/LeftPanel";
import RightPanel from "../components/RightPanel";
import CommentsDetails from "../components/CommentsDetails";
const CommentDetailsPage = () => {
  return (
    <div className="container mx-auto px-4 my-4  flex flex-col min-h-screen">
      <div className="grid md:grid-cols-12 gap-4 mx-auto ">
        <LeftPanel />
        <CommentsDetails />
        <RightPanel />
      </div>
    </div>
  );
};

export default CommentDetailsPage;
