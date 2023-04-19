import mongoose from "mongoose";
import JWT from "jsonwebtoken";
import config from "../config";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      maxLength: [50, "Name must be less than 50"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [18, "Password must be at lest 18 characters"],
      select: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods = {
  getJWTtoken: function () {
    JWT.sign({ _id: this._id }, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRY,
    });
  },
};

export default mongoose.model("User", userSchema);
