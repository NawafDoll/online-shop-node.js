const jwt = require("jsonwebtoken");
require("dotenv").config();
const protected = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      const user = jwt.verify(token, process.env.JWT_SECRET);
      res.locals.user = user;
      next();
    } else {
      res.status(401).json("you are Not auth");
    }
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = protected;
