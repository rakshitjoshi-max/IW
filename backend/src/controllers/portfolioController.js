const { prisma } = require('../config/database');

const getPortfolios = async (req, res, next) => {
  try {
    const portfolios = await prisma.portfolio.findMany({
      where: { userId: req.user.id },
      include: {
        holdings: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ portfolios });
  } catch (error) {
    next(error);
  }
};

const getPortfolio = async (req, res, next) => {
  try {
    const { id } = req.params;

    const portfolio = await prisma.portfolio.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
      include: {
        holdings: true,
      },
    });

    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }

    res.json({ portfolio });
  } catch (error) {
    next(error);
  }
};

const createPortfolio = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Portfolio name is required' });
    }

    const portfolio = await prisma.portfolio.create({
      data: {
        userId: req.user.id,
        name,
        description,
      },
    });

    res.status(201).json({
      message: 'Portfolio created successfully',
      portfolio,
    });
  } catch (error) {
    next(error);
  }
};

const updatePortfolio = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, isActive } = req.body;

    // Verify ownership
    const existingPortfolio = await prisma.portfolio.findFirst({
      where: { id, userId: req.user.id },
    });

    if (!existingPortfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }

    const portfolio = await prisma.portfolio.update({
      where: { id },
      data: { name, description, isActive },
    });

    res.json({
      message: 'Portfolio updated successfully',
      portfolio,
    });
  } catch (error) {
    next(error);
  }
};

const deletePortfolio = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Verify ownership
    const existingPortfolio = await prisma.portfolio.findFirst({
      where: { id, userId: req.user.id },
    });

    if (!existingPortfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }

    await prisma.portfolio.delete({
      where: { id },
    });

    res.json({ message: 'Portfolio deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const addHolding = async (req, res, next) => {
  try {
    const { portfolioId } = req.params;
    const { symbol, name, type, quantity, averagePrice, currentPrice, sector, purchaseDate } = req.body;

    // Verify portfolio ownership
    const portfolio = await prisma.portfolio.findFirst({
      where: { id: portfolioId, userId: req.user.id },
    });

    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }

    // Calculate values
    const investedValue = quantity * averagePrice;
    const totalValue = quantity * currentPrice;
    const returnAmount = totalValue - investedValue;
    const returnPercentage = (returnAmount / investedValue) * 100;

    const holding = await prisma.holding.create({
      data: {
        portfolioId,
        symbol,
        name,
        type,
        quantity,
        averagePrice,
        currentPrice,
        totalValue,
        investedValue,
        returnAmount,
        returnPercentage,
        sector,
        purchaseDate: new Date(purchaseDate),
      },
    });

    // Update portfolio totals
    const holdings = await prisma.holding.findMany({
      where: { portfolioId },
    });

    const totalInvested = holdings.reduce((sum, h) => sum + h.investedValue, 0);
    const totalCurrent = holdings.reduce((sum, h) => sum + h.totalValue, 0);
    const totalReturn = totalCurrent - totalInvested;
    const returnPct = totalInvested > 0 ? (totalReturn / totalInvested) * 100 : 0;

    await prisma.portfolio.update({
      where: { id: portfolioId },
      data: {
        totalValue: totalCurrent,
        investedAmount: totalInvested,
        currentReturn: totalReturn,
        returnPercentage: returnPct,
      },
    });

    res.status(201).json({
      message: 'Holding added successfully',
      holding,
    });
  } catch (error) {
    next(error);
  }
};

const updateHolding = async (req, res, next) => {
  try {
    const { portfolioId, holdingId } = req.params;
    const { quantity, averagePrice, currentPrice } = req.body;

    // Verify portfolio ownership
    const portfolio = await prisma.portfolio.findFirst({
      where: { id: portfolioId, userId: req.user.id },
    });

    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }

    // Calculate values
    const investedValue = quantity * averagePrice;
    const totalValue = quantity * currentPrice;
    const returnAmount = totalValue - investedValue;
    const returnPercentage = (returnAmount / investedValue) * 100;

    const holding = await prisma.holding.update({
      where: { id: holdingId },
      data: {
        quantity,
        averagePrice,
        currentPrice,
        totalValue,
        investedValue,
        returnAmount,
        returnPercentage,
      },
    });

    res.json({
      message: 'Holding updated successfully',
      holding,
    });
  } catch (error) {
    next(error);
  }
};

const deleteHolding = async (req, res, next) => {
  try {
    const { portfolioId, holdingId } = req.params;

    // Verify portfolio ownership
    const portfolio = await prisma.portfolio.findFirst({
      where: { id: portfolioId, userId: req.user.id },
    });

    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }

    await prisma.holding.delete({
      where: { id: holdingId },
    });

    res.json({ message: 'Holding deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPortfolios,
  getPortfolio,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
  addHolding,
  updateHolding,
  deleteHolding,
};
