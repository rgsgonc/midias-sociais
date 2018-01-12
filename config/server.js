'use strict'

const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
//const Hapi = require('hapi');
const Request = require('request');
//const Vision = require('vision');
const Handlebars = require('handlebars');
const LodashFilter = require('lodash.filter');
const LodashTake = require('lodash.take');


let app = express();

app.set("view engine", "ejs");
app.set("views", "./app/views");


app.use(express.static("./app/public"));

app.use(bodyParser.urlencoded({extended: true}));

app.use(expressValidator());

consign()
  .include('app/routes')
  .into(app);

module.exports = app;