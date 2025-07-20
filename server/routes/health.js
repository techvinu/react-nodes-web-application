const express = require('express');
const router = express.Router();

// @desc    Health check endpoint
// @route   GET /api/health
// @access  Public
router.get('/', (req, res) => {
  const healthCheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version || '1.0.0'
  };

  try {
    res.status(200).json({
      success: true,
      data: healthCheck
    });
  } catch (error) {
    healthCheck.message = error.message;
    res.status(503).json({
      success: false,
      error: 'Service Unavailable',
      data: healthCheck
    });
  }
});

module.exports = router;
