import dotenv from "dotenv";
dotenv.config();

export const configKeys = {
  MONGODB_URI: process.env.URI as string,
  PORT: process.env.PORT as string,
  SALT_ROUNDS: process.env.SALT_ROUNDS as string,
  ACCESS_KEY:process.env.ACCESS_CODE as string,
  REFRESH_KEY:process.env.REFRESH_CODE as string,
  NODE_ENV:process.env.NODE_ENV as string,
  MAIL_USERNAME: process.env.MAIL_USERNAME,
  MAIL_PASSWORD:process.env.MAIL_PASSWORD,
  OAUTH_CLIENTID:process.env.OAUTH_CLIENTID,
  OAUTH_CLIENT_SECRET: process.env.OAUTH_CLIENT_SECRET,
  OAUTH_REFRESH_TOKEN:process.env.OAUTH_REFRESH_TOKEN,
  CLOUD_NAME:process.env.CLOUD_NAME,
  API_KEY:process.env.API_KEY,
  API_SECRET:process.env.API_SECRET,
  STRIPE_KEY:process.env.STRIPE_KEY,
  STRIPE_SECRET_KEY:process.env.STRIPE_SECRET_KEY,
  SERVER_URL:process.env.SERVER_URL

};
