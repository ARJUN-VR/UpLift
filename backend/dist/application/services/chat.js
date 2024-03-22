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
            socket.on('join', (room) => {
                socket.join(room);
                console.log('roomId:', room);
                app_1.io.to(room).emit('joined');
            });
            socket.on('message', (data) => {
                const { channel, message, userName, image, video } = data;
                console.log('room:', channel);
                if (message) {
                    console.log('in the message');
                    app_1.io.to(channel).emit('recieveMessage', { channel, message, userName });
                }
                else if (video) {
                    console.log('works');
                    app_1.io.to(channel).emit('recieveMessage', { channel, userName, video });
                }
            });
            socket.on('typing', (data) => {
                const { userName, campaignId: channel } = data;
                console.log('typing:', userName, channel);
                socket.broadcast.to(channel).emit('isTyping', userName);
            });
            socket.on('ended', (data) => {
                const { campaignId: channel } = data;
                socket.broadcast.to(channel).emit('typingEnded');
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
