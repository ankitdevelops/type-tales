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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Story", storySchema);
