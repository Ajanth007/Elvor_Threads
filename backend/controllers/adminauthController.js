const { pool } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET; // ASSUMPTION: same secret as customer auth — see adminMiddleware.js

// ==========================================
// ADMIN LOGIN
// ==========================================
const adminLogin = async (req, res) => {
  try {
    console.log("admin login is initialized")
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const [admins] = await pool.query(
      `SELECT id, username, password_hash FROM admins WHERE username = ?`,
      [username]
    );

    if (admins.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const admin = admins[0];
    const passwordMatches = await bcrypt.compare(password, admin.password_hash);

    if (!passwordMatches) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username, role: "admin" },
      JWT_SECRET,
      { expiresIn: "8h" } // shorter-lived than a typical customer session, by design
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      username: admin.username,
    });

    
  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({ message: "Error logging in" });
  }
};

module.exports = { adminLogin };