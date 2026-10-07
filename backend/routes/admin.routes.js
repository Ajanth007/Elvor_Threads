const express = require("express");
const router = express.Router();

const { verifyAdmin } = require("../middleware/adminMiddleware");
const { adminLogin } = require("../controllers/adminauthController");
const { getDashboardStats } = require("../controllers/dashboardController");
const {
  getAllProductsAdmin,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productAdminController");
const { getAllOrdersAdmin, updateOrderStatus } = require("../controllers/orderAdminController");
const { getAllUsers, deleteUser } = require("../controllers/userAdminController");

// Public — no verifyAdmin here, this IS how an admin gets a token.
router.post("/admin/login", adminLogin);

// // Everything below requires a valid admin JWT.
router.get("/admin/dashboard/stats", verifyAdmin, getDashboardStats);

router.get("/admin/products", verifyAdmin, getAllProductsAdmin);
router.post("/admin/products", verifyAdmin, createProduct);
router.put("/admin/products/:id", verifyAdmin, updateProduct);
router.delete("/admin/products/:id", verifyAdmin, deleteProduct);

router.get("/admin/orders", verifyAdmin, getAllOrdersAdmin);
router.patch("/admin/orders/:id/status", verifyAdmin, updateOrderStatus);

router.get("/admin/users", verifyAdmin, getAllUsers);
// router.delete("/admin/users/:id", verifyAdmin, deleteUser);

module.exports = router;

// ASSUMPTION: mount this in your main app file, e.g.:
//   const adminRoutes = require("./admin.routes");
//   app.use("/", adminRoutes);
// (routes already include the /admin prefix, so mount at "/")