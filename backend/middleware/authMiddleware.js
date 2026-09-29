const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config/env");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // No Authorization header
  if (!authHeader) {
    return res.status(401).json({
      message: "Access denied. No token provided.",
    });
  }

  // Expected format:
  // Authorization: Bearer TOKEN
  const parts = authHeader.split(" ");

  if (
    parts.length !== 2 ||
    parts[0] !== "Bearer"
  ) {
    return res.status(401).json({
      message: "Invalid authorization format.",
    });
  }

  const token = parts[1];

  try {
    const verified = jwt.verify(
      token,
      JWT_SECRET
    );

    // Store decoded user information
    req.user = verified;

    next();

  } catch (error) {
    return res.status(403).json({
      message: "Invalid or expired token.",
    });
  }
};

module.exports = verifyToken;