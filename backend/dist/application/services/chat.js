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
        socket.on('send', (data) => __awaiter(void 0, void 0, void 0, function* () {
            const { message, userName, image } = data;
            if (!message) {
                app_1.io.emit('message', { userName, image });
<<<<<<< HEAD
            }
            else {
                app_1.io.emit('message', { message, userName, image });
            }
=======
            }
            else {
                app_1.io.emit('message', { message, userName, image });
            }
            // let imageUrl:string|undefined;
            // if(image){
            //     try{
            //        const  res = await uploadImage(image)
            //        imageUrl = res?.secure_url
            //     }catch(error){
            //         console.log(error)
            //     }
            // }
>>>>>>> 4c60e5d8a7f7cb4cd1b10853a99e4f2b5de6b735
        }));
    });
});
exports.chatConnect = chatConnect;
