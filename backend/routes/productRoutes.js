const express = require("express");

const {
  getProducts,
  getProductById,
} = require("../controllers/productController");

const router = express.Router();

// GET /products
router.get("/", getProducts);

// GET /products/:id
router.get("/:id", getProductById);

module.exports = router;