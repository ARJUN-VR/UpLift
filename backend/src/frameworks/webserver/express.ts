import cookieParser from "cookie-parser";
import express, { Application } from "express";


const expressConfig = (app: Application) => {
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ limit: '10mb', extended: true }));
  app.use(cookieParser());
 
 
};

export default expressConfig;
