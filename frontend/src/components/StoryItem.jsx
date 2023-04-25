import React, { useState } from "react";

const StoryItem = () => {
  const [content, setContent] = useState(
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et libero ut mi mattis blandit. Proin vel nisl ut enim commodo viverra nec a felis. Sed pretium, mauris eu auctor lacinia, ligula sapien ullamcorper sapien, a luctus turpis sem non est.`
  );
  return (
    <div className="card w-full bg-base-300 shadow-xl my-4">
      <div className="card-body">
        <p className="text-lg">{content.substring(0, 200)}</p>
      </div>
    </div>
  );
};

export default StoryItem;
