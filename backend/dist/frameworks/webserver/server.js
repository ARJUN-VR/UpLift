"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverConfig = void 0;
const config_1 = require("../database/mongoDb/config");
const serverConfig = (server) => {
    const startServer = () => {
        server.listen(config_1.configKeys.PORT, () => console.log(`http://localhost:${config_1.configKeys.PORT}`));
    };
    return {
        startServer
    };
};
exports.serverConfig = serverConfig;
