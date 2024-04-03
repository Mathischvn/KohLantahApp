import express from "express";
import {resEntite, resSection} from "./connection.js"
import ViteExpress from "vite-express";

const app = express();

app.get('/select', (req, res) => {
  res.send(resEntite);
})

app.get('/select2', (req, res) => {
  res.send(resSection);
})

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);