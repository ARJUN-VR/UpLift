"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatConnect = void 0;
const app_1 = require("../../app");
const chatConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    const connectionHandler = (socket) => {
        try {
            socket.on('reqIn', (data) => {
                const { email, id: channel } = data;
                socket.join(channel);
                console.log('works');
                const roomSockets = app_1.io.sockets.adapter.rooms.get(channel);
                console.log(roomSockets);
                app_1.io.to(channel).emit('res', email);
            });
            socket.on("send", (data) => {
                const { message, userName, image, video, channel } = data;
                const roomSockets = app_1.io.sockets.adapter.rooms.get(channel);
                console.log(roomSockets);
                if (!message) {
                    app_1.io.to(channel).emit("message", { userName, image });
                    console.log('a');
                }
                else if (!message && !image) {
                    app_1.io.to(channel).emit("message", { userName, video });
                    console.log('b');
                }
                else if (video && !image) {
                    app_1.io.to(channel).emit("message", { userName, video, message });
                    console.log('c');
                }
                else {
                    app_1.io.to(channel).emit("message", { message, userName, image });
                    console.log('d');
                }
            });
            socket.on("typing", (channel, userName) => {
                console.log("getting the typing event", channel, userName);
                app_1.io.to(channel).emit("isTyping", userName);
            });
        }
        catch (error) {
            console.log(error);
        }
    };
    app_1.io.on("connection", connectionHandler);
    return () => {
        app_1.io.off("connection", connectionHandler);
    };
});
exports.chatConnect = chatConnect;
