import express from "express";
import { ClientController } from "./client.controller.js";
import authMiddleware from "../../base/middlewares/auth.js";

let routes = express.Router();

routes.get("/client/populate", ClientController.createRoute("populate"));

routes.use(authMiddleware);

routes.get("/client/:clientId", ClientController.createRoute("getClient"))
routes.post("/client", ClientController.createRoute("createClient"))
routes.delete("/client/:clientId/remove", ClientController.createRoute("removeClient"))
routes.patch("/client/:clientId", ClientController.createRoute("updateClient"))

export default routes;