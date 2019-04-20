"use strict";
const express = require("express");
const serverless = require("serverless-http");
const app = express();

const bodyParser = require("body-parser");
const fs = require("fs");
const router = express.Router();

router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>FedSimulator API V1</h1>');
  res.end();
});
router.get('/brands', (req, res) => {
  const brands = JSON.parse(fs.readFileSync("wrestlers.json", "utf8"));

  res.setHeader("Content-Type", "application/json");
  res.json(brands);
});
router.get('/championships', (req, res) => {
  const championships = JSON.parse(fs.readFileSync("wrestlers.json", "utf8"));

  res.setHeader("Content-Type", "application/json");
  res.json(championships);
});
router.get('/wrestlers', (req, res) => {
  const wrestlers = JSON.parse(fs.readFileSync("wrestlers.json", "utf8"));

  res.setHeader("Content-Type", "application/json");
  res.json(wrestlers);
});
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(router);
app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
