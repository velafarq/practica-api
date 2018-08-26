const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const express_jwt = require("express-jwt");
const jsonParser = require("body-parser").json();

const cors = require("cors");
const app = express();

const path = require("path");

const JWT_SECRET = "12345";

module.exports = app => {
  app.use(express.static(path.join(__dirname, "../public")));
  app.use(jsonParser);
  app.use(cors());
  app.use(morgan("common"));

  app.use(
    express_jwt({ secret: JWT_SECRET }).unless({
      path: ["/auth/login", "/auth/register", "/"]
    })
  );

  mongoose.Promise = global.Promise;
};
