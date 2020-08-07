const express = require("express");
const projectsDB = require("../data/helpers/projectModel");
const actionsDB = require("../data/helpers/actionModel");
const validateProjectId = require("../middleware/validateProjectId");

const router = express.Router();

// GET all actions
router.get("/:id", validateProjectId, (req, res) => {
  console.log("hello");
});

module.exports = router;
