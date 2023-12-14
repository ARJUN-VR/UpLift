import express, { Application } from "express";
import http from "http";
import { connectDb } from "./frameworks/database/connection";
import expressConfig from "./frameworks/webserver/express";
import { serverConfig } from "./frameworks/webserver/server";
import { routes } from "./frameworks/webserver/routes";

const app: Application = express();

const server = http.createServer(app);

connectDb();

expressConfig(app);

routes(app);

serverConfig(server).startServer();
