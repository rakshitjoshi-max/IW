const { prisma } = require('../config/database');

const getDashboard = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Get portfolio summary
    const portfolios = await prisma.portfolio.findMany({
      where: { userId, isActive: true },
      include: {
        holdings: true,
      },
    });

    const totalPortfolioValue = portfolios.reduce((sum, p) => sum + p.totalValue, 0);
    const totalInvestedAmount = portfolios.reduce((sum, p) => sum + p.investedAmount, 0);
    const totalReturn = totalPortfolioValue - totalInvestedAmount;
    const totalReturnPercentage = totalInvestedAmount > 0 ? (totalReturn / totalInvestedAmount) * 100 : 0;

    // Get goals summary
    const goals = await prisma.financialGoal.findMany({
      where: { userId },
    });

    const goalsProgress = goals.map(goal => ({
      ...goal,
      progress: (goal.currentAmount / goal.targetAmount) * 100,
    }));

    // Get recent transactions
    const recentTransactions = await prisma.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    // Get risk assessment
    const riskAssessment = await prisma.riskAssessment.findUnique({
      where: { userId },
    });

    // Get recommendations
    const recommendations = await prisma.recommendation.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    res.json({
      summary: {
        totalPortfolioValue,
        totalInvestedAmount,
        totalReturn,
        totalReturnPercentage,
        portfolioCount: portfolios.length,
        activeGoals: goals.filter(g => g.status === 'IN_PROGRESS').length,
      },
      portfolios,
      goals: goalsProgress,
      recentTransactions,
      riskAssessment,
      recommendations,
    });
  } catch (error) {
    next(error);
  }
};

const getRecommendations = async (req, res, next) => {
  try {
    const recommendations = await prisma.recommendation.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ recommendations });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboard,
  getRecommendations,
};
