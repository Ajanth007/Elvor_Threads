const { pool } = require("../db");

// ==========================================
// CREATE ORDER
// ==========================================
const createOrder = async (req, res) => {
  const connection = await pool.getConnection();

  try {
    const userId = req.user.id;

    // Start transaction
    await connection.beginTransaction();

    // 1. Get user's cart
    const [cartItems] = await connection.query(
      `SELECT
        cart.id,
        cart.product_id,
        cart.size,
        cart.quantity,
        products.name,
        products.price,
        products.image,
        products.stock
      FROM cart
      JOIN products
        ON cart.product_id = products.id
      WHERE cart.user_id = ?`,
      [userId]
    );

    // 2. Check if cart is empty
    if (cartItems.length === 0) {
      await connection.rollback();

      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    // 3. Check stock
    for (const item of cartItems) {
      if (item.quantity > item.stock) {
        await connection.rollback();

        return res.status(400).json({
          message: `${item.name} does not have enough stock`,
        });
      }
    }

    // 4. Calculate total amount
    let totalAmount = 0;

    for (const item of cartItems) {
      totalAmount += Number(item.price) * item.quantity;
    }

    // 5. Create order
    const [orderResult] = await connection.query(
      `INSERT INTO orders
        (user_id, total_amount, status)
       VALUES (?, ?, ?)`,
      [userId, totalAmount, "pending"]
    );

    const orderId = orderResult.insertId;

    // 6. Create order items
    for (const item of cartItems) {
      const subtotal =
        Number(item.price) * item.quantity;

      await connection.query(
        `INSERT INTO order_items
          (
            order_id,
            product_id,
            product_name,
            size,
            price,
            quantity,
            subtotal
          )
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          orderId,
          item.product_id,
          item.name,
          item.size,
          item.price,
          item.quantity,
          subtotal,
        ]
      );
    }

    // 7. Clear user's cart
    await connection.query(
      `DELETE FROM cart
       WHERE user_id = ?`,
      [userId]
    );

    // 8. Commit transaction
    await connection.commit();

    // 9. Send response
    return res.status(201).json({
      message: "Order created successfully",
      orderId: orderId,
      totalAmount: totalAmount,
    });

  } catch (error) {
    // Undo everything if something fails
    await connection.rollback();

    console.error("Create order error:", error);

    return res.status(500).json({
      message: "Error creating order",
    });

  } finally {
    // Release connection back to pool
    connection.release();
  }
};


// ==========================================
// GET USER ORDERS
// ==========================================
const getOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const [orders] = await pool.query(
      `SELECT
        id,
        user_id,
        total_amount,
        status,
        created_at
      FROM orders
      WHERE user_id = ?
      ORDER BY created_at DESC`,
      [userId]
    );

    return res.status(200).json(orders);

  } catch (error) {
    console.error("Get orders error:", error);

    return res.status(500).json({
      message: "Error fetching orders",
    });
  }
};


// ==========================================
// GET SINGLE ORDER
// ==========================================
const getOrderById = async (req, res) => {
  try {
    const userId = req.user.id;
    const orderId = req.params.id;

    // Get order
    const [orders] = await pool.query(
      `SELECT
        id,
        user_id,
        total_amount,
        status,
        created_at
      FROM orders
      WHERE id = ?
      AND user_id = ?`,
      [orderId, userId]
    );

    // Check order exists
    if (orders.length === 0) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // Get order items
    const [items] = await pool.query(
      `SELECT
        id,
        product_id,
        product_name,
        size,
        price,
        quantity,
        subtotal
      FROM order_items
      WHERE order_id = ?`,
      [orderId]
    );

    return res.status(200).json({
      order: orders[0],
      items: items,
    });

  } catch (error) {
    console.error("Get order error:", error);

    return res.status(500).json({
      message: "Error fetching order",
    });
  }
};


module.exports = {
  createOrder,
  getOrders,
  getOrderById,
};