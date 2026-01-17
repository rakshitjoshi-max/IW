const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const portfolioRoutes = require('./portfolioRoutes');
const goalRoutes = require('./goalRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const riskRoutes = require('./riskRoutes');

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'InvestWise API is running' });
});

// API routes
router.use('/auth', authRoutes);
router.use('/portfolios', portfolioRoutes);
router.use('/goals', goalRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/risk-assessment', riskRoutes);

module.exports = router;
