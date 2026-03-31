/**
 * routes/userRoutes.js
 *
 * Defines all routes for the /users resource.
 * Routes only map HTTP methods + paths → controller functions.
 * No business logic lives here.
 */

const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('./userController');

// GET    /users          → list all users (supports ?role= filter)
router.get('/', getAllUsers);

// GET    /users/:id      → get one user by ID
router.get('/:id', getUserById);

// POST   /users          → create a new user
router.post('/', createUser);

// PUT    /users/:id      → update an existing user (partial or full)
router.put('/:id', updateUser);

// DELETE /users/:id      → delete a user
router.delete('/:id', deleteUser);

module.exports = router;
