import express from "express";
import { ProductController } from "./product.controller.js";
import authMiddleware from "../../base/middlewares/auth.js";

let routes = express.Router();


routes.get("/products/:clientId", ProductController.createRoute("getProducts"))

// rotas autenticadas
routes.post("/products/:clientId", authMiddleware, ProductController.createRoute("addProduct"))

export default routes;