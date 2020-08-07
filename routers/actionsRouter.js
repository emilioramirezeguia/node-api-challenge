const express = require("express");
const projectsDB = require("../data/helpers/projectModel");
const actionsDB = require("../data/helpers/actionModel");
const validateProjectId = require("../middleware/validateProjectId");

const router = express.Router();

// GET all actions
router.get("/", validateProjectId, (req, res) => {
  actionsDB
    .get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((error) => {
      error: "There was an error getting all of your actions. Please try again. :)";
    });
});

module.exports = router;
