const express = require("express");
const projectsDB = require("../data/helpers/projectModel");
const actionsDB = require("../data/helpers/actionModel");
const validateProjectId = require("../middleware/validateProjectId");
const validateAction = require("../middleware/validateAction");

const router = express.Router();

// GET all actions for every project
router.get("/", validateProjectId, (req, res) => {
  actionsDB
    .get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((error) => {
      res.status(500).json({
        error:
          "There was an error getting the actions for all of your projects. Please try again. :)",
      });
    });
});

// Create (POST) a new action for a specific project
router.post("/:id", validateProjectId, validateAction, (req, res) => {
  const project = req.project;
  const action = {
    ...req.body,
    project_id: project.id,
  };

  actionsDB
    .insert(action)
    .then((createdAction) => {
      res.status(201).json(createdAction);
    })
    .catch((error) => {
      res.status(500).json({
        error:
          "There was an error on our side creating your action. Please try again :)",
      });
    });
});

module.exports = router;
