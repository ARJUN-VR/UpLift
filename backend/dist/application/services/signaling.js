"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signaling = void 0;
const app_1 = require("../../app");
const signaling = () => {
    const signalinghandler = (socket) => {
        console.log("signaling service started");
        socket.on("joinRequest", (channel) => {
            console.log(`creator has started a live room:${channel}`);
            app_1.io.emit("invite", channel);
        });
        socket.on('joined', () => {
            app_1.io.emit('newjoin');
        });
        socket.on('call', (event) => {
            app_1.io.emit('callSent', event);
        });
        socket.on('leave', () => {
            app_1.io.emit('leaveSent');
        });
        socket.on('liveMessage', (data) => {
            const { message, userName } = data;
            app_1.io.emit('incoming', { message, userName });
        });
    };
    app_1.io.on("connection", signalinghandler);
    return () => {
        app_1.io.off("connection", signalinghandler);
    };
};
exports.signaling = signaling;
