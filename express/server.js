"use strict";
const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

// import data
const championships = JSON.parse(fs.readFileSync("./championships.json", "utf8"));
const brands = JSON.parse(fs.readFileSync("./brands.json", "utf8"));
const wrestlers = JSON.parse(fs.readFileSync("./wrestlers.json", "utf8"));

// initiate instances
const app = express();
const router = express.Router();

// app
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// router
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

// extra app
app.use("/", router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/.netlify/functions/server", router); // path must route to lambda

// export
module.exports = app;
module.exports.handler = serverless(app);
