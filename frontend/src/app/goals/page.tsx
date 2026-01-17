'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { Plus } from 'lucide-react';

export default function Goals() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Financial Goals</h1>
            <p className="text-gray-600 mt-1">Track and achieve your financial objectives</p>
          </div>
          <button className="btn btn-primary flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>New Goal</span>
          </button>
        </div>

        <div className="card text-center py-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No goals yet</h3>
          <p className="text-gray-600 mb-4">Create your first financial goal to start planning</p>
          <button className="btn btn-primary">Create Goal</button>
        </div>
      </div>
    </DashboardLayout>
  );
}
