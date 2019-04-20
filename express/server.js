'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.set('json spaces', 2);

app.get('/', function (req, res) {
  res.send('fed simulator api v1')
})

app.get('/wrestlers', function (req, res) {
  const content = JSON.parse(fs.readFileSync('wrestlers.json', 'utf8'));

  res.setHeader('Content-Type', 'application/json');
  res.send(content)
})

app.get('/championships', function (req, res) {
  const content = JSON.parse(fs.readFileSync('championships.json', 'utf8'));

  res.setHeader('Content-Type', 'application/json');
  res.send(content)
})

app.get('/brands', function (req, res) {
  const content = JSON.parse(fs.readFileSync('brands.json', 'utf8'));

  res.setHeader('Content-Type', 'application/json');
  res.send(content)
})

app.use(express.static(__dirname));
app.use(bodyParser.json());
// app.use('/.netlify/functions/server', router);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
