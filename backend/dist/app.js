"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const connection_1 = require("./frameworks/database/connection");
const express_2 = __importDefault(require("./frameworks/webserver/express"));
const server_1 = require("./frameworks/webserver/server");
const routes_1 = require("./frameworks/webserver/routes");
const cloudinaryConfig_1 = __importDefault(require("./application/services/cloudinaryConfig"));
const errorHandler_1 = __importDefault(require("./frameworks/webserver/middlewares/errorHandler"));
const socket_io_1 = require("socket.io");
const chat_1 = require("./application/services/chat");
const signaling_1 = require("./application/services/signaling");
// import path from "path"
// const currentWorkingDir = path.resolve();
// const parentDir = path.dirname(currentWorkingDir)
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: "*", // or specify your allowed origins
        methods: ["GET", "POST"], // or specify your allowed methods
        allowedHeaders: ["Authorization"], // or specify your allowed headers
        credentials: true // or false to disallow credentials
    }
});
// const enviornment = "production"
// if (enviornment === 'production') { 
//     const __dirname = path.resolve();
//     app.use(express.static(path.join(parentDir, '/Client/dist')));
//     app.get('*', (req, res) =>
//       res.sendFile(path.resolve(parentDir, 'Client', 'dist', 'index.html'))
//     );
//   } else {
//     app.get('/', (req, res) => {
//       res.send('API is running....');
//     });
//   }
(0, chat_1.chatConnect)();
(0, signaling_1.signaling)();
(0, connection_1.connectDb)();
cloudinaryConfig_1.default;
(0, express_2.default)(app);
(0, routes_1.routes)(app);
app.use(errorHandler_1.default);
(0, server_1.serverConfig)(server).startServer();
