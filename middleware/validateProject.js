const validateProject = (req, res, next) => {
  if (req.body) {
    next();
  } else if (!req.body.name) {
    res.status(400).json({ message: "Please add a name to your project :)" });
  } else {
    res
      .status(400)
      .json({ message: "Please describe what your project is about :)" });
  }
};

module.exports = validateProject;
