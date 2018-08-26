"use strict";

const express = require("express");

const mongoose = require("mongoose");

const { DATABASE_URL, PORT } = require("./config/globals.config");

const app = express();

const path = require("path");

let server;

require("./config/app.config")(app);
require("./config/errors.config")(app);
require("./config/routers.config")(app);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

function runServer(databaseUrl = DATABASE_URL, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      databaseUrl,
      err => {
        if (err) {
          return reject(err);
        }

        server = app
          .listen(PORT, () => {
            console.log(`Your app is listening on port ${PORT}`);
            resolve();
          })
          .on("error", err => {
            mongoose.disconnect();
            reject(err);
          });
      }
    );
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log("Closing server");
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = { runServer, app, closeServer };
