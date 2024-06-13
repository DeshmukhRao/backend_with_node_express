const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const secret = "jwt";

  if (token == null) {
    return res.status(401).send({ message: "Token required" });
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.status(403).send({ message: "Token invalid", err });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;