const jwt = require("jsonwebtoken");

// ASSUMPTION: same JWT secret env var your customer auth already uses.
// If admin tokens should use a separate secret, swap this out.
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Verifies the Authorization: Bearer <token> header AND that the token's
 * payload has role === "admin". A valid *customer* token is rejected here —
 * this is what makes the admin login genuinely separate, not just hidden.
 */
const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    if (payload.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    req.admin = payload; // { id, username, role }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = { verifyAdmin };