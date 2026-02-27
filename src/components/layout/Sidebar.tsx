'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as Icons from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/providers/AuthProvider';
import { NAVIGATION_SECTIONS } from '@/config/constants';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const Sidebar = () => {
  const pathname = usePathname();
  const { user, hasAllPermissions } = useAuth();
  const [expandedSections, setExpandedSections] = useState<string[]>(['home', 'reporting']);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <aside className="fixed left-0 top-14 h-[calc(100vh-3.5rem)] w-64 bg-white border-r border-neutral-200 overflow-y-auto custom-scrollbar z-40 flex flex-col">
      <nav className="p-4 flex-1 space-y-6">
        {NAVIGATION_SECTIONS.map((section) => {
          const visibleItems = section.items.filter((item) => {
            if (item.permissions && item.permissions.length > 0) {
              return hasAllPermissions([...item.permissions]);
            }
            return true;
          });

          if (visibleItems.length === 0) return null;

          const isExpanded = expandedSections.includes(section.id);
          const SectionIcon = (Icons as any)[section.icon] || Icons.Circle;
          const hasActiveItem = visibleItems.some(item =>
            pathname === item.href || pathname.startsWith(item.href + '/')
          );

          return (
            <div key={section.id} className="space-y-2 relative">
              <button
                onClick={() => toggleSection(section.id)}
                className={clsx(
                  'w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-widest transition-colors',
                  hasActiveItem
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50'
                )}
              >
                <div className="flex items-center gap-2">
                  <SectionIcon className="w-3.5 h-3.5" />
                  <span>{section.label}</span>
                </div>
                <ChevronDown
                  className={clsx(
                    'w-3 h-3 transition-transform duration-200',
                    isExpanded ? '' : '-rotate-90'
                  )}
                />
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="space-y-1 overflow-hidden ml-2 pl-3 border-l-2 border-dashed border-neutral-200"
                  >
                    {visibleItems.map((item) => {
                      const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                      const ItemIcon = (Icons as any)[item.icon || 'Circle'] || Icons.Circle;

                      return (
                        <Link key={item.id} href={item.href}>
                          <motion.div
                            whileHover={{ x: 4, backgroundColor: 'rgba(249, 250, 251, 1)' }}
                            whileTap={{ scale: 0.98 }}
                            className={clsx(
                              'group flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 relative',
                              isActive
                                ? 'bg-primary-50 text-primary-700 shadow-sm border border-primary-100'
                                : 'text-neutral-600 hover:text-neutral-900'
                            )}
                          >
                            <span
                              className={clsx(
                                'absolute -left-4 top-1/2 h-px w-3 -translate-y-1/2',
                                isActive ? 'bg-primary-300' : 'bg-neutral-300'
                              )}
                            />
                            <div className={clsx(
                              'p-1.5 rounded-lg transition-colors',
                              isActive ? 'bg-white shadow-sm' : 'bg-neutral-100 group-hover:bg-white'
                            )}>
                              <ItemIcon className="w-3.5 h-3.5" />
                            </div>
                            <span className={clsx('flex-1 text-sm font-medium', isActive ? 'font-semibold' : '')}>
                              {item.label}
                            </span>
                            {item.id === 'reporting.inbox' && (
                              <span className="bg-primary-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                                3
                              </span>
                            )}
                          </motion.div>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      {/* User Info / Profile Quick Access */}
      <div className="p-4 border-t border-neutral-100 bg-neutral-50/50">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-3 p-2 rounded-xl hover:bg-white hover:shadow-sm transition-all cursor-pointer group"
        >
          <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:scale-110 transition-transform">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-neutral-900 truncate">{user?.name}</p>
            <p className="text-[10px] font-bold text-primary-500 uppercase tracking-tight">{user?.role?.replace('_', ' ')}</p>
          </div>
        </motion.div>
      </div>
    </aside>
  );
};
