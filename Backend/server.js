/**
 * server.js — Entry point for the Portfolio API
 * Run: node server.js
 */

const express = require('express');
const userRoutes = require('./userRoutes');
const errorHandler = require('./errorHandler');
const logger = require('./logger');

const app = express();
const PORT = 3000;

// ── Core Middleware ──────────────────────────────
app.use(express.json());          // Parse incoming JSON bodies
app.use(logger);                  // Log every request to console

// ── Routes ──────────────────────────────────────
app.use('/users', userRoutes);

// ── Health Check ────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Portfolio API is running!',
    version: '1.0.0',
    endpoints: {
      'GET    /users':        'List all users',
      'GET    /users/:id':    'Get a user by ID',
      'POST   /users':        'Create a new user',
      'PUT    /users/:id':    'Update a user',
      'DELETE /users/:id':    'Delete a user',
    },
  });
});

// ── 404 — Unknown Routes ────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.originalUrl} not found.` });
});

// ── Global Error Handler (must be last) ─────────
app.use(errorHandler);

// ── Start Server ────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n✅  Server running at http://localhost:${PORT}`);
  console.log(`📋  API docs available at http://localhost:${PORT}/\n`);
});

module.exports = app;
