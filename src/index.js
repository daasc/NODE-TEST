require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});
const router = require("./router");
const database = require("./config/database");

const express = require("express");

const app = express();
const configureExpress = () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/", router);

  return app;
};

module.exports = database.authenticate().then(configureExpress);
