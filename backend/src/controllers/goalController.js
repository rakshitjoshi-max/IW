const { prisma } = require('../config/database');

const getGoals = async (req, res, next) => {
  try {
    const goals = await prisma.financialGoal.findMany({
      where: { userId: req.user.id },
      orderBy: { deadline: 'asc' },
    });

    res.json({ goals });
  } catch (error) {
    next(error);
  }
};

const getGoal = async (req, res, next) => {
  try {
    const { id } = req.params;

    const goal = await prisma.financialGoal.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    res.json({ goal });
  } catch (error) {
    next(error);
  }
};

const createGoal = async (req, res, next) => {
  try {
    const { name, description, targetAmount, deadline, priority, monthlyContribution } = req.body;

    if (!name || !targetAmount || !deadline) {
      return res.status(400).json({ error: 'Name, target amount, and deadline are required' });
    }

    const goal = await prisma.financialGoal.create({
      data: {
        userId: req.user.id,
        name,
        description,
        targetAmount: parseFloat(targetAmount),
        deadline: new Date(deadline),
        priority: priority || 1,
        monthlyContribution: monthlyContribution ? parseFloat(monthlyContribution) : null,
      },
    });

    res.status(201).json({
      message: 'Goal created successfully',
      goal,
    });
  } catch (error) {
    next(error);
  }
};

const updateGoal = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, targetAmount, currentAmount, deadline, priority, status, monthlyContribution } = req.body;

    // Verify ownership
    const existingGoal = await prisma.financialGoal.findFirst({
      where: { id, userId: req.user.id },
    });

    if (!existingGoal) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    const goal = await prisma.financialGoal.update({
      where: { id },
      data: {
        name,
        description,
        targetAmount: targetAmount ? parseFloat(targetAmount) : undefined,
        currentAmount: currentAmount ? parseFloat(currentAmount) : undefined,
        deadline: deadline ? new Date(deadline) : undefined,
        priority,
        status,
        monthlyContribution: monthlyContribution ? parseFloat(monthlyContribution) : undefined,
      },
    });

    res.json({
      message: 'Goal updated successfully',
      goal,
    });
  } catch (error) {
    next(error);
  }
};

const deleteGoal = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Verify ownership
    const existingGoal = await prisma.financialGoal.findFirst({
      where: { id, userId: req.user.id },
    });

    if (!existingGoal) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    await prisma.financialGoal.delete({
      where: { id },
    });

    res.json({ message: 'Goal deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getGoals,
  getGoal,
  createGoal,
  updateGoal,
  deleteGoal,
};
