import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  users: {
    type: String,
    default: 0
  },
  subscription: {
    type: String,
    default: 0
  },
  views: {
    type: String,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Stats = new mongoose.model("stat", Schema);
