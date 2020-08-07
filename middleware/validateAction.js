const validateAction = (req, res, next) => {
  if (!req.body.description) {
    res
      .status(400)
      .json({ message: "Please describe what action you're taking." });
  } else if (req.body.description.length > 128) {
    res
      .status(400)
      .json({
        message: "Please keep your description up to 128 characters long.",
      });
  } else if (!req.body.notes) {
    res
      .status(400)
      .json({
        message: "Please add additional information about your action.",
      });
  } else {
    next();
  }
};
