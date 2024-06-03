import express from "express";
import {resEntite, querySection, insertPlayer, getPlayer, getPlayerInventory, insertItem, getItemsInInventory, getInventoryItemPlayer, getPlayerStats, getAllItems, queryItem} from "./connection.js"
import ViteExpress from "vite-express";

const app = express();

app.get('/api/entity/:libelle', (req, res) => {
  res.send(resEntite);
})

app.get('/api/section/:id', async (req, res) => {
  //res.send(resSection);
  const id = req.params.id;
  const response  = await querySection(id);
  res.send(response);
})

app.get('/api/player/:name', async (req, res) => {
  const name = req.params.name;
  const response = await getPlayer(name);
  if(response.length === 0) {
    insertPlayer(name);
  }
  res.send(response);
})

app.get('/api/player/insert/:name/:item', async (req, res) => {
  const name = req.params.name;
  const item = req.params.item;
  const response = await getPlayer(name);
  if(response.length != 0) {
    insertItem(name, item);
  }
  res.send(response);
})

app.get('/api/player/inventory/:name/', async (req, res) => {
  const name = req.params.name;
  let response = await getPlayer(name);
  if(response.length != 0) {
    response = await getItemsInInventory(name);
    res.send(response);
  }
})

app.get('/api/player/stats/:name/', async (req, res) => {
  const name = req.params.name;
  let response = await getPlayer(name);
  if(response.length != 0) {
    response = await getPlayerStats(name);
    res.send(response);
  }
})

app.get('/api/item/:id', async (req, res) => {
  const id = req.params.id;
  const response  = await queryItem(id);
  res.send(response);
})

app.get('/api/items/all/', async (req, res) => {
  let response = await getAllItems();
  res.send(response);
})


ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);