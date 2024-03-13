"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signaling = void 0;
const app_1 = require("../../app");
const signaling = () => {
    const signalinghandler = (socket) => {
        console.log('signaling service started');
        socket.on('joinRequest', (channel) => {
            console.log(`creator has started a live room:${channel}`);
            app_1.io.to(channel).emit('invite');
        });
    };
    app_1.io.on('joinRequest', signalinghandler);
    return () => {
        app_1.io.off('joinRequest', signalinghandler);
    };
};
exports.signaling = signaling;
