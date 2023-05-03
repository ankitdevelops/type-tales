import mongoose from "mongoose";

// const commentSchema = new mongoose.Schema(
//   {
//     story: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Story",
//     },
//     content: {
//       type: String,
//       required: true,
//     },
//     author: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }], // references CommentSchema
//   },
//   { timestamps: true }
// );

const commentSchema = new mongoose.Schema(
  {
    // story: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Story",
    // },
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);
export default mongoose.model("Comment", commentSchema);
