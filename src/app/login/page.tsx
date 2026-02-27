'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/lib/providers/AuthProvider';
import { mockUsers, mockRoles } from '@/lib/mock-data/users';
import { showSuccess, showError } from '@/lib/utils/toast';
import { motion } from 'framer-motion';
import { Mail, Lock, Users } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showTestUsers, setShowTestUsers] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      showError('Please enter email and password');
      return;
    }

    const user = mockUsers.find(u => u.email === email);
    if (user) {
      login(user);
      showSuccess(`Welcome back, ${user.name}!`);
      router.push('/home');
    } else {
      showError('Invalid credentials');
    }
  };

  const handleTestUserClick = (user: typeof mockUsers[0]) => {
    setEmail(user.email);
    setPassword('demo123'); // Mock password
    setShowTestUsers(false);
  };

  const testUsers = mockUsers.map(user => {
    const userRole = mockRoles.find(r => r.id === user.roles[0]);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      roleLabel: userRole?.name || 'Unknown Role'
    };
  });

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image/Branding */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 p-12 flex-col justify-between relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white mb-4">DSR Platform</h1>
          <p className="text-primary-100 text-lg">Work Intelligence & Accountability System</p>
        </div>

        <div className="relative z-10 space-y-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">Daily Status Reports</h3>
              <p className="text-primary-100 text-sm">Track progress with structured daily reporting</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">Goal Lifecycle System</h3>
              <p className="text-primary-100 text-sm">Manage and track goals with precision</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">Performance Analytics</h3>
              <p className="text-primary-100 text-sm">Data-driven insights for better decisions</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-primary-100 text-sm">
          © 2026 DSR Platform. All rights reserved.
        </div>
      </motion.div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md"
        >
          {/* Logo for mobile */}
          <div className="lg:hidden mb-8 text-center">
            <h1 className="text-3xl font-bold text-primary-700">DSR Platform</h1>
            <p className="text-gray-600 text-sm mt-2">Work Intelligence & Accountability</p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
              <p className="text-gray-600 text-sm mt-2">Sign in to your account to continue</p>
            </div>

            {/* Login Form */}
            <div className="space-y-5">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  />
                </div>
              </div>

              {/* Login Button */}
              <Button 
                onClick={handleLogin} 
                className="w-full py-3 text-sm font-medium"
              >
                Sign In
              </Button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">For testing</span>
                </div>
              </div>

              {/* Test Users Button */}
              <button
                onClick={() => setShowTestUsers(!showTestUsers)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 border-2 border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
              >
                <Users className="w-4 h-4" />
                {showTestUsers ? 'Hide' : 'Show'} Test Users
              </button>

              {/* Test Users List */}
              {showTestUsers && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2 pt-2"
                >
                  {testUsers.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => handleTestUserClick(mockUsers.find(u => u.id === user.id)!)}
                      className="w-full p-3 bg-gray-50 hover:bg-primary-50 border border-gray-200 hover:border-primary-300 rounded-xl text-left transition-all group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900 group-hover:text-primary-700">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                        <span className="text-xs px-2 py-1 bg-primary-100 text-primary-700 rounded-full">
                          {user.roleLabel}
                        </span>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Footer Note */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                This is a demo environment with mock authentication
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
