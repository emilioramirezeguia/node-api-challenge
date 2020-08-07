const actionsDB = require("../data/helpers/actionModel");

const validateActionId = (req, res, next) => {
  actionsDB
    .get(req.params.id)
    .then((action) => {
      if (action) {
        req.action = action;
        next();
      } else {
        res
          .status(404)
          .json({ error: "We're sorry. That action doesn't exist. :(" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        error: "There was an error getting your project. Please try again. :)",
      });
    });
};

module.exports = validateActionId;
