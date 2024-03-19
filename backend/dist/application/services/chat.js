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
            socket.on("joinChannel", (data) => __awaiter(void 0, void 0, void 0, function* () {
                const { id: channel, email } = data;
                console.log(`Socket ID: ${socket.id}`);
                socket.join('room1');
                console.log(`joined on ${channel}`);
                const roomSockets = app_1.io.sockets.adapter.rooms.get('room1');
                console.log(roomSockets); // This will log all sockets in the room 'room1'
                app_1.io.to('room1').emit("userEntered", { email });
                console.log('emitted');
            }));
            socket.on("send", (data) => {
                const { message, userName, image, video, channel } = data;
                socket.join(channel);
                if (!message) {
                    app_1.io.to(channel).emit("message", { userName, image });
                }
                else if (!message && !image) {
                    app_1.io.to(channel).emit("message", { userName, video });
                }
                else if (video && !image) {
                    app_1.io.to(channel).emit("message", { userName, video, message });
                }
                else {
                    app_1.io.to(channel).emit("message", { message, userName, image });
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
