const { pool } = require("../db");

// ==========================================
// GET DASHBOARD STATS
// ==========================================
const getDashboardStats = async (req, res) => {
  try {
    const [[revenueRow]] = await pool.query(
      `SELECT COALESCE(SUM(total_amount), 0) AS totalRevenue
       FROM orders
       WHERE status != 'cancelled'`
    );

    const [[orderCountRow]] = await pool.query(`SELECT COUNT(*) AS totalOrders FROM orders`);
    const [[userCountRow]] = await pool.query(`SELECT COUNT(*) AS totalUsers FROM users`);
    const [[productCountRow]] = await pool.query(`SELECT COUNT(*) AS totalProducts FROM products`);

    // Small recent-orders list for a dashboard activity feed.
    const [recentOrders] = await pool.query(
      `SELECT
        orders.id,
        users.username AS customer_name,
        orders.total_amount,
        orders.status,
        orders.created_at
      FROM orders
      JOIN users ON orders.user_id = users.id
      ORDER BY orders.created_at DESC
      LIMIT 5`
    );

    // Last 7 days of revenue, for a simple trend chart.
    const [revenueByDay] = await pool.query(
      `SELECT DATE(created_at) AS date, COALESCE(SUM(total_amount), 0) AS revenue
       FROM orders
       WHERE status != 'cancelled' AND created_at >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
       GROUP BY DATE(created_at)
       ORDER BY date ASC`
    );

    return res.status(200).json({
      totalRevenue: revenueRow.totalRevenue,
      totalOrders: orderCountRow.totalOrders,
      totalUsers: userCountRow.totalUsers,
      totalProducts: productCountRow.totalProducts,
      recentOrders,
      revenueByDay,
    });
  } catch (error) {
    console.error("Get dashboard stats error:", error);
    return res.status(500).json({ message: "Error fetching dashboard stats" });
  }
};

module.exports = { getDashboardStats };