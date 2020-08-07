const express = require("express");
const projectsDB = require("../data/helpers/projectModel");
const validateProject = require("../middleware/validateProject");
const validateProjectId = require("../middleware/validateProjectId");

const router = express.Router();

// GET every project
router.get("/", (req, res) => {
  projectsDB
    .get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((error) => {
      res.status(500).json({
        error:
          "There was an error getting all of your projects. Please try again. :)",
      });
    });
});

// GET every action for a project by its id
router.get("/:id/actions", validateProjectId, (req, res) => {
  const project = req.project;

  projectsDB
    .getProjectActions(project.id)
    .then((projectActions) => {
      res.status(200).json(projectActions);
    })
    .catch((error) => {
      res.status(500).json({
        error:
          "There was an error getting the actions for this project. Please try again. :)",
      });
    });
});

// Create (POST) a new project
router.post("/", validateProject, (req, res) => {
  const project = req.body;

  projectsDB
    .insert(project)
    .then((createdProject) => {
      res.status(201).json(createdProject);
    })
    .catch((error) => {
      res.status(500).json({
        error:
          "There was an error on our side creating your project. Please try again. :)",
      });
    });
});

// GET project by id
router.get("/:id", validateProjectId, (req, res) => {
  const project = req.project;

  projectsDB
    .get(project.id)
    .then((foundProject) => {
      res.status(200).json(foundProject);
    })
    .catch((error) => {
      res.status(500).json({
        error: "There was an error getting your project. Please try again. :)",
      });
    });
});

// Update (PUT) a project by id
router.put("/:id", validateProject, validateProjectId, (req, res) => {
  const project = req.project;
  const projectUpdates = req.body;

  projectsDB
    .update(project.id, projectUpdates)
    .then((updatedProject) => {
      res.status(200).json(updatedProject);
    })
    .catch((error) => {
      res
        .status(500)
        .json({
          error:
            "There was an error updating your project. Please try again. :)",
        });
    });
});

// DELETE a project by id
router.delete("/:id", validateProjectId, (req, res) => {
  const project = req.project;

  projectsDB
    .remove(project.id)
    .then((confirmDeletion) => {
      res.status(204).end();
    })
    .catch((error) => {
      res.status(500).json({
        error: "There was an error deleting your project. Please try again. :)",
      });
    });
});

module.exports = router;
