const express = require("express");

const verifyToken = require("../middleware/authMiddleware");

const {
  getProfile,
} = require("../controllers/userController");

const router = express.Router();

// GET /users/profile
router.get(
  "/profile",
  verifyToken,
  getProfile
);

module.exports = router;