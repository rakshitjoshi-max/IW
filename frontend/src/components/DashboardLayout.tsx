'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Briefcase,
  Target,
  TrendingUp,
  User,
  LogOut,
  Shield
} from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  if (!user) {
    router.push('/login');
    return null;
  }

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Portfolios', href: '/portfolios', icon: Briefcase },
    { name: 'Goals', href: '/goals', icon: Target },
    { name: 'Risk Profile', href: '/risk-assessment', icon: Shield },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center space-x-2 px-6 py-6 border-b border-gray-200">
            <TrendingUp className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">InvestWise</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-gray-50">
              <div className="flex-1">
                <div className="font-medium text-gray-900">
                  {user.firstName} {user.lastName}
                </div>
                <div className="text-sm text-gray-500">{user.email}</div>
              </div>
            </div>
            <button
              onClick={logout}
              className="w-full flex items-center space-x-3 px-4 py-3 mt-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-64 p-8">
        {children}
      </div>
    </div>
  );
}
