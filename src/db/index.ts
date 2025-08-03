import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URL = process.env.MONGO_DB_URL;

async function connectToDB() {
  await mongoose.connect(MONGO_URL!);
}

export { connectToDB };
