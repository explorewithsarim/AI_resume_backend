const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authrization = (req, res, next) => {
  const header = req.headers["authorization"];
  console.log("here is header:", header);

  if (!header) {
    return res.status(401).json({
      status: 401,
      message: "Authorization header missing",
    });
  }

  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      status: 401,
      message: "Token missing",
    });
  }

  try {
    const user = jwt.verify(token, process.env.JWTSECRETKEY);
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({
      status: 403,
      message: "Token invalid / forbidden",
    });
  }
};


module.exports = authrization