import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    story: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Story",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Like", likeSchema);
