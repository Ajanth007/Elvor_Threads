const { pool } = require("../db");

const db = require("../db");

// GET CART
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

     const [cart] = await pool.query(
      `SELECT
        cart.id,
        cart.product_id,
       
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

    res.status(200).json(cart);

    res.status(200).json(results);
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({
      message: "Failed to get cart",
    });
  }
};

// ADD TO CART
const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({
        message: "Product ID and quantity are required",
      });
    }

    // Check whether product exists
    const [products] = await pool.query("SELECT * FROM products WHERE id = ?", [
      productId,
    ]);

    if (products.length === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const product = products[0];

    // Check stock
    if (quantity > product.stock) {
      return res.status(400).json({
        message: "Requested quantity exceeds available stock",
      });
    }

    // Check if product already exists in user's cart
    const [existingCart] = await pool.query(
      "SELECT * FROM cart WHERE user_id = ? AND product_id = ?",
      [userId, productId],
    );

    if (existingCart.length > 0) {
      const newQuantity = existingCart[0].quantity + quantity;

      if (newQuantity > product.stock) {
        return res.status(400).json({
          message: "Requested quantity exceeds available stock",
        });
      }

      await pool.query(
        "UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?",
        [newQuantity, userId, productId],
      );
    } else {
      await pool.query(
        "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)",
        [userId, productId, quantity],
      );
    }

    res.status(201).json({
      message: "Product added to cart",
    });
  } catch (error) {
    console.error("Add cart error:", error);

    res.status(500).json({
      message: "Failed to add product to cart",
    });
  }
};

// UPDATE CART QUANTITY
// const updateCart = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { productId } = req.params;
//     const { quantity } = req.body;

//     if (!quantity || quantity < 1) {
//       return res.status(400).json({
//         message: "Quantity must be at least 1",
//       });
//     }

//     const [products] = await pool.query(
//       "SELECT stock FROM products WHERE id = ?",
//       [productId],
//     );

//     if (products.length === 0) {
//       return res.status(404).json({
//         message: "Product not found",
//       });
//     }

//     if (quantity > products[0].stock) {
//       return res.status(400).json({
//         message: "Quantity exceeds available stock",
//       });
//     }

//     const [result] = await pool.query(
//       `
//       UPDATE cart
//       SET quantity = ?
//       WHERE user_id = ? AND product_id = ?
//       `,
//       [quantity, userId, productId],
//     );

//     if (result.affectedRows === 0) {
//       return res.status(404).json({
//         message: "Product not found in cart",
//       });
//     }

//     res.status(200).json({
//       message: "Cart updated successfully",
//     });
//   } catch (error) {
//     console.error("Update cart error:", error);

//     res.status(500).json({
//       message: "Failed to update cart",
//     });
//   }
// };

const updateCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        message: "Invalid quantity",
      });
    }

    const [result] = await pool.query(
      `UPDATE cart
       SET quantity = ?
       WHERE user_id = ?
       AND product_id = ?
       `,
      [quantity, userId, productId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    res.status(200).json({
      message: "Cart updated",
    });

  } catch (error) {
    console.error("Update cart error:", error);

    res.status(500).json({
      message: "Error updating cart",
    });
  }
};

// REMOVE FROM CART
// const removeFromCart = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { productId } = req.params;

//     const [result] = await pool.query(
//       `
//       DELETE FROM cart
//       WHERE user_id = ? AND product_id = ?
//       `,
//       [userId, productId],
//     );

//     if (result.affectedRows === 0) {
//       return res.status(404).json({
//         message: "Product not found in cart",
//       });
//     }

//     res.status(200).json({
//       message: "Product removed from cart",
//     });
//   } catch (error) {
//     console.error("Remove cart error:", error);

//     res.status(500).json({
//       message: "Failed to remove product",
//     });
//   }
// };
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;


    const [result] = await pool.query(
      `DELETE FROM cart
       WHERE user_id = ?
       AND product_id = ?
       `,
      [userId, productId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    res.status(200).json({
      message: "Product removed from cart",
    });

  } catch (error) {
    console.error("Remove cart error:", error);

    res.status(500).json({
      message: "Error removing product",
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
};
