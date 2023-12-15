import cookieParser from "cookie-parser";
import express, { Application } from "express";

const expressConfig = (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser())
};

export default expressConfig;
