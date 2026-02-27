'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, User as UserIcon, LogOut } from 'lucide-react';
import { useAuth } from '@/lib/providers/AuthProvider';
import { UserRole } from '@/lib/mock-data/users';

const roleColors: Record<UserRole, string> = {
  EMPLOYEE: 'bg-blue-100 text-blue-800',
  MANAGER: 'bg-purple-100 text-purple-800',
  DEPT_ADMIN: 'bg-orange-100 text-orange-800',
  ORG_ADMIN: 'bg-red-100 text-red-800',
  ORG_OWNER: 'bg-pink-100 text-pink-800',
  HR: 'bg-green-100 text-green-800',
  AUDITOR: 'bg-gray-100 text-gray-800',
};

const roleLabels: Record<UserRole, string> = {
  EMPLOYEE: 'Employee',
  MANAGER: 'Manager',
  DEPT_ADMIN: 'Dept Admin',
  ORG_ADMIN: 'Org Admin',
  ORG_OWNER: 'Org Owner',
  HR: 'HR',
  AUDITOR: 'Auditor',
};

export const RoleSwitcher = () => {
  const router = useRouter();
  const { user, switchRole, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const roles: UserRole[] = ['EMPLOYEE', 'MANAGER', 'DEPT_ADMIN', 'ORG_ADMIN', 'ORG_OWNER', 'HR', 'AUDITOR'];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-neutral-100 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
          <UserIcon className="w-4 h-4 text-white" />
        </div>
        <div className="text-left hidden md:block">
          <p className="text-sm font-medium text-neutral-900">{user.name}</p>
          <p className={`text-xs px-2 py-0.5 rounded-full inline-block ${roleColors[user.role]}`}>
            {roleLabels[user.role]}
          </p>
        </div>
        <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-dropdown border border-neutral-200 py-2 z-50"
            >
              <div className="px-4 py-2 border-b border-neutral-200">
                <p className="text-xs font-medium text-neutral-500 uppercase">Switch Role (Testing)</p>
              </div>
              
              <div className="py-2">
                {roles.map((role) => (
                  <button
                    key={role}
                    onClick={() => {
                      switchRole(role);
                      setIsOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-neutral-50 transition-colors flex items-center justify-between ${
                      user.role === role ? 'bg-primary-50' : ''
                    }`}
                  >
                    <span className="text-sm text-neutral-900">{roleLabels[role]}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${roleColors[role]}`}>
                      {role}
                    </span>
                  </button>
                ))}
              </div>

              <div className="px-4 py-2 border-t border-neutral-200">
                <p className="text-xs text-neutral-500 mb-2">
                  Current: <span className="font-medium text-neutral-900">{user.email}</span>
                </p>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
