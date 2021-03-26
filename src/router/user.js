const express = require("express");
const ControllerUser = require("../controller/User");
const controllerUser = new ControllerUser();
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await controllerUser.index();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const response = await controllerUser.getId(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const response = await controllerUser.store(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/authenticate", async (req, res) => {
  try {
    const response = await controllerUser.authenticate(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
