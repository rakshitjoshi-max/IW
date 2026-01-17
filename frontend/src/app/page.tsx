'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { TrendingUp, Target, Shield, BarChart3 } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-8 w-8 text-primary-600" />
            <span className="text-2xl font-bold text-gray-900">InvestWise</span>
          </div>
          <div className="space-x-4">
            <button
              onClick={() => router.push('/login')}
              className="btn btn-secondary"
            >
              Login
            </button>
            <button
              onClick={() => router.push('/register')}
              className="btn btn-primary"
            >
              Get Started
            </button>
          </div>
        </nav>

        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Smart Investment Advisory <br />
            <span className="text-primary-600">Made Simple</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Professional portfolio management and personalized investment strategies
            to help you achieve your financial goals.
          </p>
          <button
            onClick={() => router.push('/register')}
            className="btn btn-primary text-lg px-8 py-3"
          >
            Start Investing Today
          </button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          <div className="card text-center">
            <div className="flex justify-center mb-4">
              <BarChart3 className="h-12 w-12 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Portfolio Tracking</h3>
            <p className="text-gray-600">
              Monitor your investments in real-time with detailed analytics
            </p>
          </div>

          <div className="card text-center">
            <div className="flex justify-center mb-4">
              <Target className="h-12 w-12 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Goal Planning</h3>
            <p className="text-gray-600">
              Set and track your financial goals with smart recommendations
            </p>
          </div>

          <div className="card text-center">
            <div className="flex justify-center mb-4">
              <Shield className="h-12 w-12 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Risk Assessment</h3>
            <p className="text-gray-600">
              Personalized risk profiling to match your investment style
            </p>
          </div>

          <div className="card text-center">
            <div className="flex justify-center mb-4">
              <TrendingUp className="h-12 w-12 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Expert Advice</h3>
            <p className="text-gray-600">
              Get professional recommendations tailored to your profile
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 bg-primary-600 text-white rounded-2xl p-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">$2.5B+</div>
              <div className="text-primary-100">Assets Under Management</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-primary-100">Active Investors</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15%</div>
              <div className="text-primary-100">Average Annual Returns</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 InvestWise. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
