import express from "express";
import bodyParser from "body-parser";
import dbConnection from "./base/db/index.js";
import ClientRoutes from "./controllers/client/routes.js"
import ProductRoutes from "./controllers/product/routes.js"
import UserRoutes from "./controllers/user/routes.js"

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", (req, res) => {
  return res.json({ server: 'ok' });
})

app.use(UserRoutes);
app.use(ClientRoutes);
app.use(ProductRoutes);

export default async () => {
  await dbConnection();
  return app;
};