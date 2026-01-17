'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { dashboardAPI } from '@/lib/api';
import { DashboardData } from '@/types';
import { TrendingUp, TrendingDown, Wallet, Target, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await dashboardAPI.getDashboard();
      setData(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-xl text-gray-600">Loading dashboard...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Overview of your investment portfolio</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  ${data?.summary.totalPortfolioValue.toLocaleString() || '0'}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Wallet className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Return</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  ${data?.summary.totalReturn.toLocaleString() || '0'}
                </p>
                <p className={`text-sm mt-1 ${
                  (data?.summary.totalReturnPercentage || 0) >= 0
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}>
                  {(data?.summary.totalReturnPercentage || 0).toFixed(2)}%
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                {(data?.summary.totalReturnPercentage || 0) >= 0 ? (
                  <TrendingUp className="h-6 w-6 text-green-600" />
                ) : (
                  <TrendingDown className="h-6 w-6 text-red-600" />
                )}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Portfolios</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {data?.summary.portfolioCount || 0}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Goals</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {data?.summary.activeGoals || 0}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Target className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Risk Assessment Banner */}
        {!data?.riskAssessment && (
          <div className="card bg-yellow-50 border-yellow-200">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-6 w-6 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900">Complete Your Risk Assessment</h3>
                <p className="text-gray-600 mt-1">
                  Take our risk assessment quiz to get personalized investment recommendations.
                </p>
                <button
                  onClick={() => window.location.href = '/risk-assessment'}
                  className="mt-3 btn btn-primary"
                >
                  Take Assessment
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Recommendations */}
        {data?.recommendations && data.recommendations.length > 0 && (
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Investment Recommendations</h2>
            <div className="space-y-4">
              {data.recommendations.slice(0, 3).map((rec) => (
                <div key={rec.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{rec.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{rec.description}</p>
                      {rec.symbol && (
                        <span className="inline-block mt-2 px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded">
                          {rec.symbol}
                        </span>
                      )}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      rec.action === 'BUY'
                        ? 'bg-green-100 text-green-700'
                        : rec.action === 'SELL'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {rec.action}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => window.location.href = '/portfolios'}
            className="card text-left hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 mb-2">Manage Portfolios</h3>
            <p className="text-gray-600 text-sm">View and manage your investment portfolios</p>
          </button>

          <button
            onClick={() => window.location.href = '/goals'}
            className="card text-left hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 mb-2">Set Financial Goals</h3>
            <p className="text-gray-600 text-sm">Create and track your financial objectives</p>
          </button>

          <button
            onClick={() => window.location.href = '/profile'}
            className="card text-left hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 mb-2">Update Profile</h3>
            <p className="text-gray-600 text-sm">Keep your information up to date</p>
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
