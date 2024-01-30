import cookieParser from "cookie-parser";
import express, { Application } from "express";
import cors from 'cors'



const expressConfig = (app: Application) => {
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ limit: '10mb', extended: true }));
  app.use(cookieParser());
  app.use(cors({
    origin: true,
   }));
 
 
};

export default expressConfig;
