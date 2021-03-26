const faker = require('faker');
const { factory } = require("factory-girl");
const { User } = require("../../models");
factory.define("User", User, {
  name: faker.name.firstName(),
  email: faker.internet.email(),
  role: "admin",
  password: "paulo12345",
});

module.exports = factory;
