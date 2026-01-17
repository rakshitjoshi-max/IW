const express = require('express');
const router = express.Router();
const {
  getPortfolios,
  getPortfolio,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
  addHolding,
  updateHolding,
  deleteHolding,
} = require('../controllers/portfolioController');
const { authenticate } = require('../middleware/auth');

// All routes require authentication
router.use(authenticate);

// Portfolio routes
router.get('/', getPortfolios);
router.post('/', createPortfolio);
router.get('/:id', getPortfolio);
router.put('/:id', updatePortfolio);
router.delete('/:id', deletePortfolio);

// Holding routes
router.post('/:portfolioId/holdings', addHolding);
router.put('/:portfolioId/holdings/:holdingId', updateHolding);
router.delete('/:portfolioId/holdings/:holdingId', deleteHolding);

module.exports = router;
