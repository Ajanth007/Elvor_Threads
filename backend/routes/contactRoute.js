// import express from "express";
// import { sendContactMessage } from "../controllers/contactController.js";

// const router = express.Router();

// router.post("/", sendContactMessage);

// export default router;

const express = require("express");
const router = express.Router();

const {
  sendContactMessage,
} = require("../controllers/contactController");

router.post("/", sendContactMessage);

module.exports = router;
