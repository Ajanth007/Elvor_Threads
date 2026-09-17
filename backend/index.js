const express = require('express');

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
const db = require('./db');
const cors = require('cors');
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});


app.use("/uploads", express.static("uploads"));

app.get("/shop", (req, res) => {
  const sql = "SELECT * FROM elvor_threads.products";

  console.log("All-Students");

  db.query(sql, (err, result) => {
    if (err) return res.status(400).send("failed to show students");

    console.log(result);
    return res.status(200).json(result);
  });
});
  

app.get("/product/:id", (req, res) => {

  const id = req.params.id;

  const sql = `SELECT * FROM elvor_threads.products WHERE id = ?`;

  db.query(sql, [id], (error, response) => {

    if (error) {
      console.log(error);
      return res.status(500).send("Database Error");
    }

    if (response.length === 0) {
      return res.status(404).send("Product not found");
    }

    res.json(response[0]);
  });

});




