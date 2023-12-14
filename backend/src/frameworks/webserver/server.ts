import { Server } from "http";
import { configKeys } from "../database/mongoDb/config";

export const serverConfig = (server: Server) => {
  const startServer = () => {
    server.listen(configKeys.PORT, () =>
      console.log(`http://localhost:${configKeys.PORT}`)
    );
  };
  return {
    startServer,
  };
};
