const express = require("express");
const clientSchema = require("../models/clients.models");
const { default: mongoose } = require("mongoose");

const router = express();

//create client
router.post("/signup", (req, res) => {
  console.log(req.body);
  const newClient = clientSchema(req.body);
  newClient
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.json({ message: err }));
});

//get all clients
router.get("/getClients", (req, res) => {
  const allClients = clientSchema;
  allClients
    .find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.error(err));
});

//get one client
router.get("/getOneClient/:id", (req, res) => {
  const { id } = req.params;
  const oneClient = clientSchema;
  oneClient
    .findById(id)
    .then((data) => res.json(data))
    .catch((err) => console.error(err));
});

//update client
router.put("/editClient/:id", (req, res) => {
  const { id } = req.params;
  const { name, lastName, dni, mail, password } = req.body;
  const oneClient = clientSchema;
  oneClient
    .updateOne({ _id: id }, { $set: { name, lastName, dni, mail, password } })
    .then((data) => res.json(data))
    .catch((err) => console.error(err));
});

router.put("/delete/:id", (req, res) => {
  const { id } = req.params;
  const deletedClient = clientSchema;
  deletedClient
    .findOneAndDelete({ _id: id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
