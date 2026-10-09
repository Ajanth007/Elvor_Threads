const express = require("express");
const cors = require("cors");

const { PORT } = require("./config/env");
const { createTables } = require("./db");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoute");
const orderRoute = require("./routes/orderRoute");
const contactRoute = require("./routes/contactRoute.js")
const adminRoutes = require("./routes/admin.routes");

const app = express();

// =========================
// Middleware
// =========================

app.use(cors());
app.use(express.json());

// Static files
app.use("/uploads", express.static("uploads"));

// =========================
// Routes
// =========================

app.use("/auth", authRoutes);
app.use("/shop", productRoutes);
app.use("/users", userRoutes);
app.use("/cart",cartRoutes);
app.use("/order",orderRoute)
app.use("/contact",contactRoute)
 app.use("/", adminRoutes);


// =========================
// Basic Routes
// =========================

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/test", (req, res) => {
  console.log("TEST REQUEST RECEIVED");

  res.json({
    message: "TEST OK",
  });
});

// =========================
// 404 Handler
// =========================

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// =========================
// Start Server
// =========================

async function startServer() {
  try {
    await createTables();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}

startServer();