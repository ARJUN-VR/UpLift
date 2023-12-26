import { Application } from "express";
import router from "./userRoutes";
import adminRouter from "./adminRoutes";

export const routes = (app: Application) => {
  app.use('/api/user', router);
  app.use('/api/admin',adminRouter)
};
