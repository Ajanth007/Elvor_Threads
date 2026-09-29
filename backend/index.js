// const express = require("express");

// const app = express();
// const { createTables } = require("./db");

// app.use(express.json()); // Middleware to parse JSON bodies
// const db = require("./db");
// const cors = require("cors");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

// app.use(cors()); // Enable CORS for all routes
// app.use(express.json());

// const PORT = 8000;
// async function startServer() {
//   try {
//     await createTables();

//     app.listen(PORT, () => {
//       console.log("Server running on http://localhost:8000");
//     });
//   } catch (error) {
//     console.error("Failed to start server:", error);
//   }
// }

// startServer();

// app.use("/uploads", express.static("uploads"));

// app.get("/shop", (req, res) => {
//   const sql = "SELECT * FROM elvor_threads.products";

//   console.log("All-Students");

//   db.query(sql, (err, result) => {
//     if (err) return res.status(400).send("failed to show students");

//     console.log(result);
//     return res.status(200).json(result);
//   });
// });

// app.get("/product/:id", (req, res) => {
//   const id = req.params.id;

//   const sql = `SELECT * FROM elvor_threads.products WHERE id = ?`;

//   db.query(sql, [id], (error, response) => {
//     if (error) {
//       console.log(error);
//       return res.status(500).send("Database Error");
//     }

//     if (response.length === 0) {
//       return res.status(404).send("Product not found");
//     }

//     res.json(response[0]);
//   });
// });

// //JWT TOKEN

// const secretKey = "abcdef";

// // Temporary storage.
// // This will be replaced by MySQL later.
// // const users = [];

// // =========================
// // JWT Middleware
// // =========================

// const verifyToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     return res.status(401).json({
//       message: "Access denied. No token provided.",
//     });
//   }

//   // Expected:
//   // Authorization: Bearer TOKEN

//   const token = authHeader.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({
//       message: "Invalid authorization format.",
//     });
//   }

//   try {
//     const verified = jwt.verify(token, secretKey);

//     req.user = verified;

//     next();
//   } catch (error) {
//     return res.status(403).json({
//       message: "Invalid or expired token.",
//     });
//   }
// };

// // =========================
// // Register
// // =========================

// app.post("/register", async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     if (!username || !password) {
//       return res.status(400).json({
//         message: "Username and password are required.",
//       });
//     }

//     // Check if username already exists
//     const [existingUsers] = await db
//       .promise()
//       .query("SELECT id FROM users WHERE username = ?", [username]);

//     if (existingUsers.length > 0) {
//       return res.status(409).json({
//         message: "Username already exists.",
//       });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Insert user into MySQL
//     const [result] = await db
//       .promise()
//       .query("INSERT INTO users (username, password) VALUES (?, ?)", [
//         username,
//         hashedPassword,
//       ]);

//     return res.status(201).json({
//       message: "User created successfully.",
//       userId: result.insertId,
//     });
//   } catch (error) {
//     console.error(error);

//     return res.status(500).json({
//       message: "Error creating user.",
//     });
//   }
// });

// // =========================
// // Login
// // =========================

// app.post("/login", async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     if (!username || !password) {
//       return res.status(400).json({
//         message: "Username and password are required.",
//       });
//     }

//     // Find user in MySQL
//     const [users] = await db
//       .promise()
//       .query("SELECT * FROM users WHERE username = ?", [username]);

//     if (users.length === 0) {
//       return res.status(401).json({
//         message: "Invalid username or password.",
//       });
//     }

//     const user = users[0];

//     // Compare entered password with hashed password
//     const validPassword = await bcrypt.compare(password, user.password);

//     if (!validPassword) {
//       return res.status(401).json({
//         message: "Invalid username or password.",
//       });
//     }

//     // Create JWT
//     const token = jwt.sign(
//       {
//         id: user.id,
//         username: user.username,
//       },
//       secretKey,
//       {
//         expiresIn: "1h",
//       },
//     );

//     return res.json({
//       message: "Login successful",
//       token: token,
//       user: {
//         id: user.id,
//         username: user.username,
//       },
//     });
//   } catch (error) {
//     console.error(error);

//     return res.status(500).json({
//       message: "Error logging in.",
//     });
//   }
// });

// // =========================
// // Profile
// // =========================

// app.get("/profile", verifyToken, async (req, res) => {
//   try {
//     const [users] = await db
//       .promise()
//       .query("SELECT id, username FROM users WHERE id = ?", [req.user.id]);

//     if (users.length === 0) {
//       return res.status(404).json({
//         message: "User not found.",
//       });
//     }

//     const user = users[0];

//     return res.json({
//       id: user.id,
//       username: user.username,
//     });
//   } catch (error) {
//     console.error(error);

//     return res.status(500).json({
//       message: "Error fetching profile.",
//     });
//   }
// });

// // =========================
// // Home
// // =========================

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

// // =========================
// // Test
// // =========================

// app.get("/test", (req, res) => {
//   console.log("TEST REQUEST RECEIVED");

//   res.json({
//     message: "TEST OK",
//   });
// });

// // POST   /cart
// // GET    /cart
// // PUT    /cart/:productId
// // DELETE /cart/:productId

// // POST   /orders
// // GET    /orders

// // =========================
// // Server
// // =========================

// app.listen(3001, () => {
//   console.log("Backend is running on port 3001");
// });



const express = require("express");
const cors = require("cors");

const { PORT } = require("./config/env");
const { createTables } = require("./db");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoute");

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