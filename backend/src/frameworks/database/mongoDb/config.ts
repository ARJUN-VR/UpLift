import dotenv from "dotenv";
dotenv.config();

export const configKeys = {
  MONGODB_URI: process.env.URI as string,
  PORT: process.env.PORT as string,
  SALT_ROUNDS: process.env.SALT_ROUNDS as string,
};
