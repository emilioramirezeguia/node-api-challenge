const validateProject = (req, res, next) => {
  if (!req.body.name) {
    res.status(400).json({ message: "Please add a name to your project :)" });
  } else if (!req.body.description) {
    res
      .status(400)
      .json({ message: "Please describe what your project is about :)" });
  } else {
    next();
  }
};

module.exports = validateProject;
