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
import { configKeys } from "./frameworks/database/mongoDb/config";
const currentWorkingDir = path.resolve();
const parentDir = path.dirname(currentWorkingDir)
const productionParendDir = path.dirname(parentDir)
console.log('currentworkingdir:',currentWorkingDir)
console.log('parendDir:',parentDir)
console.log('productiondir:',productionParendDir)

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

  
    expressConfig(app);
    routes(app);
    app.use(handleError)

console.log(configKeys.ENVIORNMENT)

  if ( configKeys.ENVIORNMENT === 'Production') { 
      app.use(express.static(path.join( productionParendDir , '/frontend/dist')));
    
      app.get('*', (req, res) =>
        res.sendFile(path.resolve( productionParendDir , 'frontend', 'dist', 'index.html'))
      );
   
    } else {
      app.use(express.static(path.join( parentDir , '/frontend/dist')));
    
      app.get('*', (req, res) =>
        res.sendFile(path.resolve( parentDir , 'frontend', 'dist', 'index.html'))
      );
    }

chatConnect()
signaling()

connectDb();

cloudinary






serverConfig(server).startServer();
