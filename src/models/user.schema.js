import mongoose from "mongoose";
import JWT from "jsonwebtoken";
import config from "../config/index.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      maxLength: [50, "Name must be less than 50"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "username not available"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already registered"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [9, "Password must be at lest 9 characters"],
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
  comparePassword: async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  },
  getJwtToken: function () {
    return JWT.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY,
    });
  },
};

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getJwtToken = function () {
  return JWT.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

export default mongoose.model("User", userSchema);
