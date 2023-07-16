// src/routes/api.js
const express = require('express');
const router = express.Router();
const intersectionsController = require('../controllers/intersectionsController');
const authMiddleware = require('../utils/auth');

// API endpoint for intersections
router.post('/intersections', authMiddleware, intersectionsController.findIntersections);

module.exports = router;
