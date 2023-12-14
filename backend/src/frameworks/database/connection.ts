import mongoose from "mongoose";
import { configKeys } from "./mongoDb/config";

export const connectDb = async () => {
  try {
    await mongoose.connect(configKeys.MONGODB_URI);
    console.log("db connected successfully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
