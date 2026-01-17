const express = require('express');
const router = express.Router();
const { getRiskAssessment, createRiskAssessment } = require('../controllers/riskController');
const { authenticate } = require('../middleware/auth');

// All routes require authentication
router.use(authenticate);

router.get('/', getRiskAssessment);
router.post('/', createRiskAssessment);

module.exports = router;
