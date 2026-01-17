const { prisma } = require('../config/database');

const getRiskAssessment = async (req, res, next) => {
  try {
    const riskAssessment = await prisma.riskAssessment.findUnique({
      where: { userId: req.user.id },
    });

    if (!riskAssessment) {
      return res.status(404).json({ error: 'Risk assessment not found' });
    }

    res.json({ riskAssessment });
  } catch (error) {
    next(error);
  }
};

const createRiskAssessment = async (req, res, next) => {
  try {
    const {
      timeHorizon,
      investmentGoals,
      liquidityNeeds,
      marketKnowledge,
      lossComfort,
    } = req.body;

    // Calculate risk score and tolerance
    const score = (marketKnowledge + lossComfort + timeHorizon / 5) / 3;

    let riskTolerance = 'CONSERVATIVE';
    if (score >= 7) {
      riskTolerance = 'AGGRESSIVE';
    } else if (score >= 4) {
      riskTolerance = 'MODERATE';
    }

    // Check if assessment already exists
    const existing = await prisma.riskAssessment.findUnique({
      where: { userId: req.user.id },
    });

    let riskAssessment;
    if (existing) {
      riskAssessment = await prisma.riskAssessment.update({
        where: { userId: req.user.id },
        data: {
          riskTolerance,
          timeHorizon,
          investmentGoals,
          liquidityNeeds,
          marketKnowledge,
          lossComfort,
          score,
        },
      });
    } else {
      riskAssessment = await prisma.riskAssessment.create({
        data: {
          userId: req.user.id,
          riskTolerance,
          timeHorizon,
          investmentGoals,
          liquidityNeeds,
          marketKnowledge,
          lossComfort,
          score,
        },
      });
    }

    res.status(201).json({
      message: 'Risk assessment completed successfully',
      riskAssessment,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRiskAssessment,
  createRiskAssessment,
};
