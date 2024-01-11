import express, { Application } from "express";
import http from "http";
import { connectDb } from "./frameworks/database/connection";
import expressConfig from "./frameworks/webserver/express";
import { serverConfig } from "./frameworks/webserver/server";
import { routes } from "./frameworks/webserver/routes";
import cloudinary from "./application/services/uploadImage";
import handleError from "./frameworks/webserver/middlewares/errorHandler";

const app: Application = express();

const server = http.createServer(app);

connectDb();

cloudinary



expressConfig(app);
routes(app);
app.use(handleError)



serverConfig(server).startServer();
