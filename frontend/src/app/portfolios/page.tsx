'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { portfolioAPI } from '@/lib/api';
import { Portfolio } from '@/types';
import { Plus, TrendingUp, TrendingDown } from 'lucide-react';

export default function Portfolios() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadPortfolios();
  }, []);

  const loadPortfolios = async () => {
    try {
      const response = await portfolioAPI.getAll();
      setPortfolios(response.data.portfolios);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load portfolios');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-xl text-gray-600">Loading portfolios...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Portfolios</h1>
            <p className="text-gray-600 mt-1">Manage your investment portfolios</p>
          </div>
          <button className="btn btn-primary flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>New Portfolio</span>
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {portfolios.length === 0 ? (
          <div className="card text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No portfolios yet</h3>
            <p className="text-gray-600 mb-4">Create your first portfolio to start tracking investments</p>
            <button className="btn btn-primary">Create Portfolio</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolios.map((portfolio) => (
              <div key={portfolio.id} className="card hover:shadow-lg transition-shadow cursor-pointer">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{portfolio.name}</h3>
                {portfolio.description && (
                  <p className="text-gray-600 text-sm mb-4">{portfolio.description}</p>
                )}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Value</span>
                    <span className="font-semibold">${portfolio.totalValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Invested</span>
                    <span className="font-semibold">${portfolio.investedAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Return</span>
                    <div className="flex items-center space-x-1">
                      {portfolio.returnPercentage >= 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                      <span className={`font-semibold ${
                        portfolio.returnPercentage >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {portfolio.returnPercentage.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <span className="text-sm text-gray-600">
                    {portfolio.holdings?.length || 0} holdings
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
