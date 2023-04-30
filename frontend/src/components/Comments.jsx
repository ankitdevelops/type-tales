import React from "react";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
const Comments = () => {
  return (
    <section className=" bg-base-300 mt-10">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Discussion (20)
          </h2>
        </div>
        <CommentForm />
        <CommentList />
      </div>
    </section>
  );
};

export default Comments;
