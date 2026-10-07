// const { pool } = require("../db");

// // ==========================================
// // GET ALL USERS
// // ==========================================
// const getAllUsers = async (req, res) => {
//   try {
//     // ASSUMPTION: column names on `users` — adjust if yours differ
//     // (e.g. no `email` column yet, or `name` instead of `username`).
//     const [users] = await pool.query(
//       `SELECT id, username, email, created_at FROM users ORDER BY created_at DESC`
//     );

//     return res.status(200).json(users);
//   } catch (error) {
//     console.error("Get all users error:", error);
//     return res.status(500).json({ message: "Error fetching users" });
//   }
// };

// // ==========================================
// // DELETE USER
// // ==========================================
// const deleteUser = async (req, res) => {
//   try {
//     const userId = req.params.id;

//     const [result] = await pool.query(`DELETE FROM users WHERE id = ?`, [userId]);

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     return res.status(200).json({ message: "User deleted successfully" });
//   } catch (error) {
//     // Likely a foreign-key constraint if the user has existing orders/cart rows.
//     console.error("Delete user error:", error);
//     return res.status(500).json({
//       message: "Could not delete user. They may have existing orders.",
//     });
//   }
// };

// module.exports = { getAllUsers, deleteUser };

const { pool } = require("../db");

// ==========================================
// GET ALL USERS
// ==========================================
const getAllUsers = async (req, res) => {
  try {
    const [users] = await pool.query(`
      SELECT
        id,
        username,
        
        created_at
      FROM users
      ORDER BY created_at DESC
    `);

    return res.status(200).json(users);
  } catch (error) {
    console.error("Get all users error:", error);

    return res.status(500).json({
      message: "Error fetching users",
    });
  }
};

// ==========================================
// DELETE USER
// ==========================================
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const [result] = await pool.query(
      `DELETE FROM users WHERE id = ?`,
      [userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete user error:", error);

    return res.status(500).json({
      message: "Could not delete user. They may have existing orders.",
    });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
};