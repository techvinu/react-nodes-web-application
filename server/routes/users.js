const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const logger = require('../utils/logger');

// In-memory storage for demo purposes
// In production, this would be replaced with a database
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', createdAt: new Date().toISOString() },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', createdAt: new Date().toISOString() }
];
let nextId = 3;

// Validation middleware
const validateUser = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address')
];

// Helper function to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors.array()
    });
  }
  next();
};

// @desc    Get all users
// @route   GET /api/users
// @access  Public
router.get('/', (req, res) => {
  try {
    logger.info('Fetching all users');
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    logger.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Public
router.get('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    logger.info(`Fetching user with id: ${id}`);
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    logger.error('Error fetching user:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// @desc    Create new user
// @route   POST /api/users
// @access  Public
router.post('/', validateUser, handleValidationErrors, (req, res) => {
  try {
    const { name, email } = req.body;

    // Check if email already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'Email already exists'
      });
    }

    const newUser = {
      id: nextId++,
      name,
      email,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    logger.info(`Created new user: ${email}`);

    res.status(201).json({
      success: true,
      data: newUser
    });
  } catch (error) {
    logger.error('Error creating user:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Public
router.put('/:id', validateUser, handleValidationErrors, (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;
    
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Check if email already exists (excluding current user)
    const existingUser = users.find(u => u.email === email && u.id !== id);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'Email already exists'
      });
    }

    users[userIndex] = {
      ...users[userIndex],
      name,
      email,
      updatedAt: new Date().toISOString()
    };

    logger.info(`Updated user with id: ${id}`);
    res.status(200).json({
      success: true,
      data: users[userIndex]
    });
  } catch (error) {
    logger.error('Error updating user:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Public
router.delete('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    const deletedUser = users.splice(userIndex, 1)[0];
    logger.info(`Deleted user with id: ${id}`);

    res.status(200).json({
      success: true,
      data: deletedUser
    });
  } catch (error) {
    logger.error('Error deleting user:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

module.exports = router;
