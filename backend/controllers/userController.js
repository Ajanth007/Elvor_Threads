const db = require("../db");
const { pool } = require("../db");

// =========================
// Get Profile
// =========================

const getProfile = async (req, res) => {
  try {
    const [users] = await pool.query(
      "SELECT id, username FROM elvor_threads.users WHERE id = ?",
      [req.user.id],
    );

    if (users.length === 0) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    return res.status(200).json(users[0]);
  } catch (error) {
    console.error("Profile error:", error);

    return res.status(500).json({
      message: "Error fetching profile.",
    });
  }
};

module.exports = {
  getProfile,
};
