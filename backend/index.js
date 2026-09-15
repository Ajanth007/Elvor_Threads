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