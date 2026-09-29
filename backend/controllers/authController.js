const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { pool } = require("../db");
const { JWT_SECRET } = require("../config/env");

// =========================
// Register
// =========================

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required.",
      });
    }

    // Check if username already exists
    const [existingUsers] = await pool.query(
      "SELECT id FROM users WHERE username = ?",
      [username],
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        message: "Username already exists.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const [result] = await pool.query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, hashedPassword],
    );

    return res.status(201).json({
      message: "User created successfully.",
      userId: result.insertId,
    });
  } catch (error) {
    console.error("Register error:", error);

    return res.status(500).json({
      message: "Error creating user.",
    });
  }
};

// =========================
// Login
// =========================

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required.",
      });
    }

    // Find user
    const [users] = await pool.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);

    if (users.length === 0) {
      return res.status(401).json({
        message: "Invalid username or password.",
      });
    }

    const user = users[0];

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({
        message: "Invalid username or password.",
      });
    }

    // Create JWT
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Error logging in.",
    });
  }
};

module.exports = {
  register,
  login,
};
