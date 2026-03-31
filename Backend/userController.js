/**
 * controllers/userController.js
 *
 * Business logic for each user operation.
 * Controllers receive req/res from routes and interact with the data store.
 */

const db = require('./users');

// ── GET /users ───────────────────────────────────────────────────────────────
// Returns all users. Supports optional ?role= query filter.
const getAllUsers = (req, res) => {
  let users = db.getAll();

  // Optional filter: GET /users?role=Frontend Developer
  const { role } = req.query;
  if (role) {
    users = users.filter(u =>
      u.role && u.role.toLowerCase().includes(role.toLowerCase())
    );
  }

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
};

// ── GET /users/:id ───────────────────────────────────────────────────────────
// Returns a single user by numeric ID.
const getUserById = (req, res) => {
  const id = parseInt(req.params.id, 10);

  // Validate that :id is actually a number
  if (isNaN(id)) {
    return res.status(400).json({ success: false, message: 'User ID must be a number.' });
  }

  const user = db.getById(id);

  if (!user) {
    return res.status(404).json({ success: false, message: `User with ID ${id} not found.` });
  }

  res.status(200).json({ success: true, data: user });
};

// ── POST /users ───────────────────────────────────────────────────────────────
// Creates a new user. Requires name and email in the request body.
const createUser = (req, res) => {
  const { name, email, role, skills } = req.body;

  // ── Validation ──────────────────────────────────────────────────────────
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim() === '') {
    errors.push('name is required and must be a non-empty string.');
  }

  if (!email || typeof email !== 'string' || email.trim() === '') {
    errors.push('email is required and must be a non-empty string.');
  } else {
    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      errors.push('email must be a valid email address.');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: 'Validation failed.', errors });
  }

  // ── Duplicate email check ────────────────────────────────────────────────
  const existing = db.getAll().find(u => u.email.toLowerCase() === email.trim().toLowerCase());
  if (existing) {
    return res.status(409).json({ success: false, message: 'A user with this email already exists.' });
  }

  // ── Create ───────────────────────────────────────────────────────────────
  const newUser = db.create({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    role: role ? role.trim() : 'Student',
    skills: Array.isArray(skills) ? skills : [],
  });

  res.status(201).json({
    success: true,
    message: 'User created successfully.',
    data: newUser,
  });
};

// ── PUT /users/:id ───────────────────────────────────────────────────────────
// Updates an existing user. Only provided fields are changed (partial update).
const updateUser = (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ success: false, message: 'User ID must be a number.' });
  }

  // Check if user exists first
  if (!db.getById(id)) {
    return res.status(404).json({ success: false, message: `User with ID ${id} not found.` });
  }

  // Prevent changing the ID field
  const { id: _ignoredId, createdAt: _ignoredDate, ...allowedFields } = req.body;

  // Validate email format if provided
  if (allowedFields.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(allowedFields.email.trim())) {
      return res.status(400).json({ success: false, message: 'email must be a valid email address.' });
    }
    allowedFields.email = allowedFields.email.trim().toLowerCase();
  }

  if (allowedFields.name) {
    allowedFields.name = allowedFields.name.trim();
  }

  const updated = db.update(id, allowedFields);

  res.status(200).json({
    success: true,
    message: 'User updated successfully.',
    data: updated,
  });
};

// ── DELETE /users/:id ────────────────────────────────────────────────────────
// Permanently removes a user.
const deleteUser = (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ success: false, message: 'User ID must be a number.' });
  }

  const deleted = db.remove(id);

  if (!deleted) {
    return res.status(404).json({ success: false, message: `User with ID ${id} not found.` });
  }

  res.status(200).json({
    success: true,
    message: `User "${deleted.name}" deleted successfully.`,
    data: deleted,
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
