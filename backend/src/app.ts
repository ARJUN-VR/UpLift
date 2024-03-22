import express, { Application } from "express";
import http from "http";
import { connectDb } from "./frameworks/database/connection";
import expressConfig from "./frameworks/webserver/express";
import { serverConfig } from "./frameworks/webserver/server";
import { routes } from "./frameworks/webserver/routes";
import cloudinary from "./application/services/cloudinaryConfig";
import handleError from "./frameworks/webserver/middlewares/errorHandler";
import {Server,Socket} from 'socket.io'
import { chatConnect } from "./application/services/chat";
import { signaling } from "./application/services/signaling";

import path from "path"
const currentWorkingDir = path.resolve();
const parentDir = path.dirname(currentWorkingDir)

const app: Application = express();

const server = http.createServer(app);
export const io = new Server(server, {
    cors: {
      origin: "*", // or specify your allowed origins
      methods: ["GET", "POST"], // or specify your allowed methods
      allowedHeaders: ["Authorization"], // or specify your allowed headers
      credentials: true // or false to disallow credentials
    }
  });


  // const enviornment = "production"

  // if (enviornment === 'production') { 
  //     path.resolve();
  //     app.use(express.static(path.join(parentDir, '/frontend/dist')));
    
  //     app.get('*', (req, res) =>
  //       res.sendFile(path.resolve(parentDir, 'frontend', 'dist', 'index.html'))
  //     );
   
  //   } else {
  //     app.get('/', (req, res) => {
  //       res.send('API is running....');
  //     });
  //   }

chatConnect()
signaling()

connectDb();

cloudinary



expressConfig(app);
routes(app);
app.use(handleError)



serverConfig(server).startServer();
