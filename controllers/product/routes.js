import express from "express";
import { ProductController } from "./product.controller.js";
import authMiddleware from "../../base/middlewares/auth.js";

let routes = express.Router();


routes.use(authMiddleware);

routes.get("/products/:clientId", ProductController.createRoute("getProducts"))
routes.post("/products/:clientId", ProductController.createRoute("addProduct"))

export default routes;