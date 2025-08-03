import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    creds: {
      type: mongoose.SchemaTypes.Mixed,
      required: true,
    },
    keys: {
      type: mongoose.SchemaTypes.Mixed,
      required: true,
    },
    qr: {
      url: {
        type: String,
      },
      isUsed: {
        type: Boolean,
        default: false,
      },
    },
  },
  { timestamps: true }
);

const model = mongoose.model("waAuth", schema);

export default model;
