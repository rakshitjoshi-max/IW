const express = require('express');
const router = express.Router();
const { getDashboard, getRecommendations } = require('../controllers/dashboardController');
const { authenticate } = require('../middleware/auth');

// All routes require authentication
router.use(authenticate);

router.get('/', getDashboard);
router.get('/recommendations', getRecommendations);

module.exports = router;
