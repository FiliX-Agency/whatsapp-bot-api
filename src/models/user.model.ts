import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 3,
      maxLength: 50,
    },
    surname: {
      type: String,
      minLength: 3,
      maxLength: 50,
    },
    username: {
      type: String,
      minLength: 3,
      maxLength: 50,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const model = mongoose.model("user", schema);

export default model;
