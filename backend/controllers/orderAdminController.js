// const { pool } = require("../db");

// const VALID_STATUSES = ["pending", "shipped", "delivered", "cancelled"];

// // ==========================================
// // GET ALL ORDERS (admin — every user, not just req.user.id)
// // ==========================================
// const getAllOrdersAdmin = async (req, res) => {
//   try {
//     // ASSUMPTION: your `users` table has a `username` column — adjust the
//     // joined column name if it's actually `name` or something else.
//     const [orders] = await pool.query(
//       `SELECT
//         orders.id,
//         orders.user_id,
//         users.username AS customer_name,
//         orders.total_amount,
//         orders.status,
//         orders.created_at
//       FROM orders
//       JOIN users ON orders.user_id = users.id
//       ORDER BY orders.created_at DESC`
//     );

//     return res.status(200).json(orders);
//   } catch (error) {
//     console.error("Get all orders error:", error);
//     return res.status(500).json({ message: "Error fetching orders" });
//   }
// };

// // ==========================================
// // UPDATE ORDER STATUS
// // ==========================================
// const updateOrderStatus = async (req, res) => {
//   try {
//     const orderId = req.params.id;
//     const { status } = req.body;

//     if (!VALID_STATUSES.includes(status)) {
//       return res.status(400).json({
//         message: `Status must be one of: ${VALID_STATUSES.join(", ")}`,
//       });
//     }

//     const [result] = await pool.query(`UPDATE orders SET status = ? WHERE id = ?`, [
//       status,
//       orderId,
//     ]);

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     return res.status(200).json({ message: "Order status updated successfully" });
//   } catch (error) {
//     console.error("Update order status error:", error);
//     return res.status(500).json({ message: "Error updating order status" });
//   }
// };

// module.exports = { getAllOrdersAdmin, updateOrderStatus };

const { pool } = require("../db");

const VALID_STATUSES = [
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
];

// GET ALL ORDERS
const getAllOrdersAdmin = async (req, res) => {
  try {
    const [orders] = await pool.query(`
      SELECT
        orders.id,
        orders.user_id,
        users.username AS customer_name,
        orders.total_amount,
        orders.status,
        orders.created_at
      FROM orders
      JOIN users ON orders.user_id = users.id
      ORDER BY orders.created_at DESC
    `);

    return res.status(200).json(orders);
  } catch (error) {
    console.error("Get all orders error:", error);

    return res.status(500).json({
      message: "Error fetching orders",
    });
  }
};

// UPDATE ORDER STATUS
const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        message: `Status must be one of: ${VALID_STATUSES.join(", ")}`,
      });
    }

    const [result] = await pool.query(
      `UPDATE orders SET status = ? WHERE id = ?`,
      [status, orderId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    return res.status(200).json({
      message: "Order status updated successfully",
    });
  } catch (error) {
    console.error("Update order status error:", error);

    return res.status(500).json({
      message: "Error updating order status",
    });
  }
};

module.exports = {
  getAllOrdersAdmin,
  updateOrderStatus,
};