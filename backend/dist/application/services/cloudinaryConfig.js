"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const config_1 = require("../../frameworks/database/mongoDb/config");
cloudinary_1.v2.config({
    cloud_name: `${config_1.configKeys.CLOUD_NAME}`,
    api_key: `${config_1.configKeys.API_KEY}`,
    api_secret: `${config_1.configKeys.API_SECRET}`
});
exports.default = cloudinary_1.v2;
