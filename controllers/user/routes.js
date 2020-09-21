import express from "express";
import { UserController } from "./user.controller.js";
import authMiddleware from "../../base/middlewares/auth.js";

let routes = express.Router();

routes.get("/user/populate", UserController.createRoute("populate"));
routes.post("/user/login", UserController.createRoute("login"));

// rotas autenticadas

export default routes;