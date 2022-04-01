const validateUser = require("../utils/validateUser")

module.exports = function protectedRoute(req,res,next) {
    const cookie = req.cookies["jwt"];
    const data = validateUser(cookie);
    if (data) {
      try {
        const { id } = data;
        res.locals.id = id;
        next();
      } catch {
        res.sendStatus(403);
      }
    } else {
      res.sendStatus(403);
    }
  }
  