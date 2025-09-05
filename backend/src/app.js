// src/app.js
const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Healthcheck
app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "inVEZ API", timestamp: new Date().toISOString() });
});

module.exports = app;
