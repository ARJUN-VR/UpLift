"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitEventToClient = void 0;
const emitEventToClient = (io, event, data) => {
    io.emit(event, data);
};
exports.emitEventToClient = emitEventToClient;
