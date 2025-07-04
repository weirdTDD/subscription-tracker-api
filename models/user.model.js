import { match } from "assert";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true,'User name is required'],
    trim: true,
    minlength: [3, 'User name must be at least 3 characters long'],
    maxlength: [50, 'User name must be at most 50 characters long'],
  },
  email: {
    type: String,
    required: [true, 'User Email is required'],
    unique: true,
    lowercase: true,
    trim: true, 
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  },
{ timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;