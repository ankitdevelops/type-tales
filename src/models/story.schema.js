import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
  {
    story: {
      type: String,
      required: true,
      maxLength: [500, "Maximum 500 character allowed"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
      // {
      //   author: {
      //     type: mongoose.Schema.Types.ObjectId,
      //     ref: "User",
      //     required: true,
      //   },
      //   content: {
      //     type: String,
      //     required: true,
      //   },
      //   createdAt: {
      //     type: Date,
      //     default: Date.now,
      //   },
      // },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Story", storySchema);
