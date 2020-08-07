const express = require("express");
const projectsDB = require("../data/helpers/projectModel");
const actionsDB = require("../data/helpers/actionModel");
const validateProjectId = require("../middleware/validateProjectId");
const validateAction = require("../middleware/validateAction");
const validateActionId = require("../middleware/validateActionId");

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

// GET action by id
router.get("/:id", validateActionId, (req, res) => {
  const action = req.action;

  actionsDB
    .get(action.id)
    .then((foundAction) => {
      res.status(200).json(foundAction);
    })
    .catch((error) => {
      res.status(500).json({
        error: "There was an error getting your action. Please try again. :)",
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

// Update (PUT) a new action by id
router.put("/:id", validateAction, validateActionId, (req, res) => {
  const action = req.action;
  const actionUpdates = req.body;

  actionsDB
    .update(action.id, actionUpdates)
    .then((updatedAction) => {
      res.status(200).json(updatedAction);
    })
    .catch((error) => {
      res.status(500).json({
        error: "There was an error updating your action. Please try again. :)",
      });
    });
});

// DELETE an action by id
router.delete("/:id", validateActionId, (req, res) => {
  const action = req.action;

  actionsDB
    .remove(action.id)
    .then((confirmDeletion) => {
      res.status(204).end();
    })
    .catch((error) => {
      res.status(500).json({
        error: "There was an error deleting your project. Please ty again. :)",
      });
    });
});

module.exports = router;
