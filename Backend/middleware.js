const User = require("./db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("./config");
const authMiddleware = function (req, res, next) {
  const Header = req.headers.authorization;

  if (!Header || !Header.startsWith("Bearer")) {
    res.status(403).send("Token Error/Header error");
  }
  //Bearer ko hatao token ko lao bhai log
  const token = Header.split(" ")[1];

  try {
    // Token to verify karo aur decode object niklega
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.userId) {
      req.userId = decoded.userId;
      next();
    } else {
      return res.status(403).send("Invalid Token");
    }
  } catch (error) {
    res.status(403).send("Token Error/Header error");
  }
};

module.exports = {
  authMiddleware,
};
