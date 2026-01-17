export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: string;
  subscriptionPlan: string;
  profile?: UserProfile;
}

export interface UserProfile {
  id: string;
  dateOfBirth?: string;
  occupation?: string;
  annualIncome?: number;
  netWorth?: number;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country: string;
}

export interface Portfolio {
  id: string;
  name: string;
  description?: string;
  totalValue: number;
  investedAmount: number;
  currentReturn: number;
  returnPercentage: number;
  isActive: boolean;
  holdings?: Holding[];
  createdAt: string;
  updatedAt: string;
}

export interface Holding {
  id: string;
  symbol: string;
  name: string;
  type: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  totalValue: number;
  investedValue: number;
  returnAmount: number;
  returnPercentage: number;
  sector?: string;
  purchaseDate: string;
}

export interface FinancialGoal {
  id: string;
  name: string;
  description?: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  priority: number;
  status: 'PLANNING' | 'IN_PROGRESS' | 'ACHIEVED' | 'ABANDONED';
  monthlyContribution?: number;
  createdAt: string;
  updatedAt: string;
}

export interface RiskAssessment {
  id: string;
  riskTolerance: 'CONSERVATIVE' | 'MODERATE' | 'AGGRESSIVE';
  timeHorizon: number;
  investmentGoals: string[];
  liquidityNeeds: string;
  marketKnowledge: number;
  lossComfort: number;
  score: number;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  symbol?: string;
  action: string;
  targetPrice?: number;
  riskLevel: string;
  reasoning: string;
  isActive: boolean;
  createdAt: string;
}

export interface DashboardData {
  summary: {
    totalPortfolioValue: number;
    totalInvestedAmount: number;
    totalReturn: number;
    totalReturnPercentage: number;
    portfolioCount: number;
    activeGoals: number;
  };
  portfolios: Portfolio[];
  goals: FinancialGoal[];
  recentTransactions: any[];
  riskAssessment?: RiskAssessment;
  recommendations: Recommendation[];
}
