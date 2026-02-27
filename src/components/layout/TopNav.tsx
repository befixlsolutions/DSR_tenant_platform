'use client';

import { useState } from 'react';
import { Bell, Search, Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { RoleSwitcher } from './RoleSwitcher';

interface TopNavProps {
  onMobileMenuToggle?: () => void;
}

export const TopNav = ({ onMobileMenuToggle }: TopNavProps) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 h-14 bg-white/90 backdrop-blur-lg border-b border-neutral-200 z-50">
      <div className="h-full px-3 sm:px-5 flex items-center justify-between gap-3">
        <button
          onClick={onMobileMenuToggle}
          className="md:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors touch-target"
        >
          <Menu className="w-5 h-5 text-neutral-600" />
        </button>

        <div className="flex items-center space-x-3 min-w-0">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-600 to-indigo-500 text-white flex items-center justify-center text-xs font-bold shadow-sm">DSR</div>
          <div className="min-w-0">
            <h1 className="text-sm sm:text-base font-bold text-neutral-900 truncate">Tenant Intelligence Platform</h1>
            <p className="hidden lg:block text-[10px] text-neutral-500 font-medium">Reliable reporting • Explainable analytics • Safer decisions</p>
          </div>
        </div>

        <div className="hidden md:flex flex-1 max-w-xl mx-2 lg:mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search reports, goals, blockers..."
              className="w-full pl-9 pr-4 py-1.5 text-sm rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-neutral-50"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="md:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors touch-target"
          >
            <Search className="w-5 h-5 text-neutral-600" />
          </button>

          <button className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-primary-100 bg-primary-50 text-primary-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            AI Brief
          </button>

          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg hover:bg-neutral-100 transition-colors touch-target"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-600" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </button>

            <AnimatePresence>
              {showNotifications && (
                <>
                  <div
                    className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setShowNotifications(false)}
                  />

                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-xl shadow-lg border border-neutral-200 p-3 z-50 max-h-[80vh] overflow-y-auto"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-semibold">Notifications</h3>
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="md:hidden p-1 rounded hover:bg-neutral-100"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      <div className="p-2 hover:bg-neutral-50 rounded-lg cursor-pointer touch-feedback border border-neutral-100">
                        <p className="text-xs font-medium">New DSR submitted</p>
                        <p className="text-xs text-neutral-500">2 minutes ago</p>
                      </div>
                      <div className="p-2 hover:bg-neutral-50 rounded-lg cursor-pointer touch-feedback border border-neutral-100">
                        <p className="text-xs font-medium">AI summary draft is ready</p>
                        <p className="text-xs text-neutral-500">10 minutes ago</p>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <div className="hidden md:block">
            <RoleSwitcher />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-neutral-200 bg-white"
          >
            <div className="p-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search reports, goals, blockers..."
                  className="w-full pl-9 pr-4 py-2.5 text-base rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-neutral-50"
                  autoFocus
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
