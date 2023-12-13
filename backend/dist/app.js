"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const connection_1 = require("./frameworks/database/connection");
const express_2 = __importDefault(require("./frameworks/webserver/express"));
const server_1 = require("./frameworks/webserver/server");
const routes_1 = require("./frameworks/webserver/routes");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
(0, connection_1.connectDb)();
(0, express_2.default)(app);
(0, routes_1.routes)(app);
(0, server_1.serverConfig)(server).startServer();
