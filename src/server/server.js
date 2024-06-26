import express from "express";
import {resEntite, updatePlayerSection, querySection, insertPlayer, getPlayer, getPlayerInventory, insertItem, getItemsInInventory, getInventoryItemPlayer, getPlayerStats, getAllItems, queryItem, getPlayerWithPassword, verifyItem, equip_item} from "./connection.js"
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

app.get('/api/player/insertPlayer/:name/:password', async (req, res) => {
  const name = req.params.name;
  const password = req.params.password;
  const response = await getPlayer(name);
  if(response.length === 0) {
    const response_insert = await insertPlayer(name, password);
    insertItem(name, 1);
  }
  res.send(response);

  
})

app.get('/api/player/getPlayer/:name/:password', async (req, res) => {
  const name = req.params.name;
  const password = req.params.password;
  const response = await getPlayerWithPassword(name, password);
  if(response !== undefined) {
    res.send(response);
  }
  else {
    res.send(null);
  }
  
})

app.get('/api/player/insertItem/:name/:item', async (req, res) => {
  const name = req.params.name;
  const item = req.params.item;
  const response = await getPlayer(name);
  const valueAlreadyExists = await verifyItem(name, item);
  if(response.length != 0) {
    insertItem(name, item);
  }
  res.send(valueAlreadyExists);
})

app.get('/api/player/inventory/:name/', async (req, res) => {
  const name = req.params.name;
  let response = await getPlayer(name);
  if(response.length != 0) {
    response = await getItemsInInventory(name);
    res.send(response);
  }
})

app.get('/api/player/changeSection/:name/:section', async (req, res) => {
  const name = req.params.name;
  const section = req.params.section;
  let response = await getPlayer(name);
  if(response.length != 0) {
    updatePlayerSection(name, section)
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

app.get('/api/player/:name/', async (req, res) => {
  const name = req.params.name;
  let response = await getPlayer(name);
  res.send(response);
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

app.get('/api/items/equip/:name/:id', async (req, res) => {
  const name = req.params.name;
  const id = req.params.id;
  let response = await equip_item(name, id);
  res.send(response);
})


ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);