"use strict";
const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();

app.use(cors());

const router = express.Router();

const championships = JSON.parse(fs.readFileSync("championships.json", "utf8"));
const brands = JSON.parse(fs.readFileSync("brands.json", "utf8"));
const wrestlers = JSON.parse(fs.readFileSync("wrestlers.json", "utf8"));

router.get("/", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.json({ brands, wrestlers, championships });
  res.end();
});
router.get("/brands", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.json(brands);
});
router.get("/championships", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.json(championships);
});
router.get("/wrestlers", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.json(wrestlers);
});

app.use("/", router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/.netlify/functions/server", router); // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
