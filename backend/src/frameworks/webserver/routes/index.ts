import { Application } from "express";
import router from "./userRoutes";

export const routes = (app: Application) => {
  app.use('/api/user', router);
};
