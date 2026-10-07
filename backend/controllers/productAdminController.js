const { pool } = require("../db");

// ==========================================
// GET ALL PRODUCTS (admin — includes stock)
// ==========================================
const getAllProductsAdmin = async (req, res) => {
  try {
    const [products] = await pool.query(
      `SELECT id, name, price, original_price, stock, image, tag, description
       FROM products
       ORDER BY id DESC`
    );

    return res.status(200).json(products);
  } catch (error) {
    console.error("Get admin products error:", error);
    return res.status(500).json({ message: "Error fetching products" });
  }
};

// ==========================================
// CREATE PRODUCT
// ==========================================
const createProduct = async (req, res) => {
  try {
    const { name, price, originalPrice, stock, image, tag, description } = req.body;

    if (!name || price === undefined || stock === undefined) {
      return res.status(400).json({ message: "name, price, and stock are required" });
    }

    const [result] = await pool.query(
      `INSERT INTO products (name, price, original_price, stock, image, tag, description)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, price, originalPrice || null, stock, image || null, tag || null, description || null]
    );

    return res.status(201).json({
      message: "Product created successfully",
      productId: result.insertId,
    });
  } catch (error) {
    console.error("Create product error:", error);
    return res.status(500).json({ message: "Error creating product" });
  }
};

// ==========================================
// UPDATE PRODUCT
// ==========================================
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, price, originalPrice, stock, image, tag, description } = req.body;

    const [result] = await pool.query(
      `UPDATE products
       SET name = ?, price = ?, original_price = ?, stock = ?, image = ?, tag = ?, description = ?
       WHERE id = ?`,
      [name, price, originalPrice || null, stock, image, tag || null, description || null, productId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Update product error:", error);
    return res.status(500).json({ message: "Error updating product" });
  }
};

// ==========================================
// DELETE PRODUCT
// ==========================================
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const [result] = await pool.query(`DELETE FROM products WHERE id = ?`, [productId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    // Likely a foreign-key constraint if the product is referenced by
    // existing order_items — surface a clearer message than a raw SQL error.
    console.error("Delete product error:", error);
    return res.status(500).json({
      message: "Could not delete product. It may be referenced by existing orders.",
    });
  }
};

module.exports = { getAllProductsAdmin, createProduct, updateProduct, deleteProduct };