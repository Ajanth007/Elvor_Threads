const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
  createOrder,
  getOrders,
  getOrderById,
} = require("../controllers/orderController");

// Create order
router.post("/", verifyToken, createOrder);

// Get logged-in user's orders
router.get("/", verifyToken, getOrders);

// Get one order
router.get("/:id", verifyToken, getOrderById);

module.exports = router;