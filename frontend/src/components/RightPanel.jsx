import React, { useState } from "react";

const RightPanel = () => {
  const [content, setContent] = useState(
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et libero ut mi mattis blandit. Proin vel nisl ut enim commodo viverra nec a felis. Sed pretium, mauris eu auctor lacinia, ligula sapien ullamcorper sapien, a luctus turpis sem non est.`
  );
  return (
    <div className="md:col-span-3 hidden md:block ">
      <h3 className="text-xl font-semibold mb-4 underline underline-offset-1">
        Featured Story
      </h3>
      <div className="card w-full bg-base-300 shadow-xl mb-3">
        <div className="card-body p-4">
          <p>{content.substring(0, 50)}</p>
        </div>
      </div>
      <div className="card w-full bg-base-300 shadow-xl mb-3">
        <div className="card-body p-4">
          <p>{content.substring(0, 50)}</p>
        </div>
      </div>
      <div className="card w-full bg-base-300 shadow-xl mb-3">
        <div className="card-body p-4">
          <p>{content.substring(0, 50)}</p>
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
