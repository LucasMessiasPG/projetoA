import express from "express";
import { ClientController } from "./client.controller.js";
import authMiddleware from "../../base/middlewares/auth.js";

let routes = express.Router();

routes.get("/client/populate", ClientController.createRoute("populate"));
routes.get("/client/:clientId", ClientController.createRoute("getClient"))

// rotas autenticadas
routes.post("/client", authMiddleware, ClientController.createRoute("createClient"))
routes.delete("/client/:clientId/remove", authMiddleware, ClientController.createRoute("removeClient"))
routes.patch("/client/:clientId", authMiddleware, ClientController.createRoute("updateClient"))

export default routes;