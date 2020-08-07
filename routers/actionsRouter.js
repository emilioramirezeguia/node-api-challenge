const express = require("express");
const projectsDB = require("../data/helpers/projectModel");
const actionsDB = require("../data/helpers/actionModel");
const validateProjectId = require("../middleware/validateProjectId");

const router = express.Router();

// GET all actions for every project
router.get("/", validateProjectId, (req, res) => {
  actionsDB
    .get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((error) => {
      error: "There was an error getting the actions for all of your projects. Please try again. :)";
    });
});

module.exports = router;
