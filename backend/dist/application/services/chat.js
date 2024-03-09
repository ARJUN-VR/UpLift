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
    app_1.io.on('connection', (socket) => {
        console.log('user entered chat section');
        socket.on('chat', () => {
            console.log('chat');
        });
        socket.on('joinRequest', (channel) => {
            console.log(`a creator started live on ${channel} channel check`);
            app_1.io.emit('invite', channel);
        });
        socket.on('joined', () => {
            app_1.io.emit('newjoin');
        });
        socket.on('offer', (offer) => {
            app_1.io.emit('offersent', offer);
        });
        socket.on('answer', (answer) => {
            app_1.io.emit('answersent', answer);
        });
        socket.on('ice', (candidate) => {
            app_1.io.emit('icesent', candidate);
        });
        socket.on('send', (data) => __awaiter(void 0, void 0, void 0, function* () {
            const { message, userName, image, channel } = data;
            socket.join(channel);
            if (!message) {
                app_1.io.to(channel).emit('message', { userName, image });
            }
            else {
                app_1.io.to(channel).emit('message', { message, userName, image });
            }
        }));
    });
});
exports.chatConnect = chatConnect;
