const express = require("express");

const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

const {
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
} = require("../controllers/cartController");

// Get user's cart
router.get("/", verifyToken,getCart);

// Add product to cart
router.post("/", verifyToken,addToCart);

// Update product quantity
router.put("/:productId", verifyToken,updateCart);

// Remove product from cart
router.delete("/:productId",verifyToken, removeFromCart);

module.exports = router;