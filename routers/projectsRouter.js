const express = require("express");
const projectsDB = require("../data/helpers/projectModel");
const validateProject = require("../middleware/validateProject");

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
          "There was an error getting all of your projects. Please try again :)",
      });
    });
});

// CREATE a new project
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
          "There was an error on our side creating your project. Please try again :)",
      });
    });
});

module.exports = router;
