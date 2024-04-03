import express from "express";
import {resEntite} from "./connection.js"
import ViteExpress from "vite-express";

const app = express();

app.get('/select', (req, res) => {
  res.send(resEntite);
})

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);