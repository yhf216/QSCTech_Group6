import express from 'express';
const app = express();
const port = 3000;

import http from 'http';
import fs from 'fs';
import os from "os";

import 'dotenv/config';

var httpServer = http.createServer(app);

httpServer.listen(port, () => {
  var ifaces = os.networkInterfaces();
  console.log("Listening");

  Object.keys(ifaces).forEach(function (dev) {
    ifaces[dev].forEach(function (details) {
      if (details.family === "IPv4") {
        console.log("  " + "http://" + details.address + ":" + port);
      }
    });
  });
});

import bodyParser from "body-parser";
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use((req, res, next) => {
    res.set({
      "Access-Control-Allow-Origin": req.get("Origin"),
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Methods": "POST,GET,OPTIONS",
      "Access-Control-Allow-Headers": "content-type",
      Vary: "Origin",
    });
    next();
  });

  app.use((req, res, next) => {
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
   })


import * as sqlite from "sqlite";
import sqlite3 from "sqlite3";

/**
 * @type sqlite.Database<sqlite3.Database, sqlite3.Statement>
 */
let db;

let openedFlag = false;

app.use(async (_, $, next) => {
  if (!openedFlag) {
    db = await sqlite.open({
      filename: "./data/data.db",
      driver: sqlite3.cached.Database,
    });
    openedFlag = true;
  }

  next();
});



// Write as if you were in the root directory of the project
// But you need to compile the typescript files first.

// A better implementation is `app.use('root',...)` but it may be a bit diffucult to use db.
// ... and it can be because of my poor skills :(
// You can refactor it using Fastify if you want! 

// BTW, I hate typescript ( when I need to write something quickly ).
import UsersRouteFactory from "./routes/user.js";
UsersRouteFactory(app, db);