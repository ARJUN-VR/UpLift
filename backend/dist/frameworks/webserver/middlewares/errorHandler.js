"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleError = (err, req, res, next) => {
    res.status(403).json({ message: err.message });
};
exports.default = handleError;
