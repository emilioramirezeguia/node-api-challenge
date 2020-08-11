const projectsDB = require("../data/helpers/projectModel");

const validateProjectId = (req, res, next) => {
  projectsDB
    .get(req.params.id)
    .then((project) => {
      if (project) {
        req.project = project;
        next();
      } else {
        res
          .status(404)
          .json({ error: "We're sorry. That project doesn't exist. :(" });
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({
          error:
            "There was an error getting your project. Please try again. :)",
        });
    });
};

module.exports = validateProjectId;
