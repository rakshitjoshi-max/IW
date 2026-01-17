'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { Shield } from 'lucide-react';

export default function RiskAssessment() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Risk Assessment</h1>
          <p className="text-gray-600 mt-1">Understand your investment risk profile</p>
        </div>

        <div className="card text-center py-12">
          <div className="flex justify-center mb-4">
            <Shield className="h-16 w-16 text-primary-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Take Your Risk Assessment</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Answer a few questions to help us understand your investment goals and risk tolerance
          </p>
          <button className="btn btn-primary">Start Assessment</button>
        </div>
      </div>
    </DashboardLayout>
  );
}
