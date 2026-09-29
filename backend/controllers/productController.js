const db = require("../db");
const { pool } = require("../db");

// =========================
// Get All Products
// =========================

const getProducts = async (req, res) => {
  try {
    const [products] = await pool
      .query(
        "SELECT * FROM elvor_threads.products;"
      );

    return res.status(200).json(products);

  } catch (error) {
    console.error(
      "Get products error:",
      error
    );

    return res.status(500).json({
      message: "Failed to fetch products.",
    });
  }
};

// =========================
// Get Product By ID
// =========================

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const [products] = await pool
      .query(
        "SELECT * FROM elvor_threads.products WHERE id = ?",
        [id]
      );

    if (products.length === 0) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    return res.status(200).json(products[0]);

  } catch (error) {
    console.error(
      "Get product error:",
      error
    );

    return res.status(500).json({
      message: "Database error.",
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
};