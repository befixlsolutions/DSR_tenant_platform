'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Home, ClipboardList, Target, AlertTriangle, User, LogOut, Settings, Command } from 'lucide-react';
import { NAVIGATION_SECTIONS } from '@/config/constants';
import { useAuth } from '@/lib/providers/AuthProvider';

export const CommandPalette = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const router = useRouter();
    const { user, logout } = useAuth();

    const allItems = [
        { id: 'home', label: 'Home Dashboard', href: '/home', icon: Home, section: 'Navigation' },
        ...NAVIGATION_SECTIONS.flatMap(s => s.items.map(item => ({
            id: item.id,
            label: item.label,
            href: item.href,
            icon: ClipboardList, // Simplified for now, could map icon strings to components
            section: s.label
        }))),
        { id: 'profile', label: 'My Profile', href: '/profile', icon: User, section: 'Account' },
        { id: 'settings', label: 'Settings', href: '/settings', icon: Settings, section: 'Account' },
        { id: 'logout', label: 'Log Out', action: logout, icon: LogOut, section: 'Account', danger: true },
        { id: 'new-dsr', label: 'Start New DSR', href: '/reporting/dsr/new', icon: ClipboardList, section: 'Quick Actions' },
        { id: 'new-blocker', label: 'Report Blocker', href: '/blockers/new', icon: AlertTriangle, section: 'Quick Actions' },
    ];

    const filteredItems = query === ''
        ? allItems.slice(0, 10)
        : allItems.filter(item =>
            item.label.toLowerCase().includes(query.toLowerCase()) ||
            item.section.toLowerCase().includes(query.toLowerCase())
        );

    const toggle = useCallback(() => setIsOpen(open => !open), []);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                toggle();
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, [toggle]);

    const onSelect = (item: typeof allItems[0]) => {
        if (item.href) {
            router.push(item.href);
        } else if (item.action) {
            item.action();
        }
        setIsOpen(false);
        setQuery('');
    };

    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(i => (i + 1) % filteredItems.length);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(i => (i - 1 + filteredItems.length) % filteredItems.length);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (filteredItems[selectedIndex]) {
                onSelect(filteredItems[selectedIndex]);
            }
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-neutral-200"
                    >
                        <div className="flex items-center px-4 py-3 border-b border-neutral-100 bg-neutral-50/50">
                            <Search className="w-5 h-5 text-neutral-400 mr-3" />
                            <input
                                autoFocus
                                className="flex-1 bg-transparent border-none outline-none text-neutral-900 placeholder:text-neutral-400 text-base"
                                placeholder="Type a command or search..."
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <div className="flex items-center gap-1.5 px-2 py-1 bg-white border border-neutral-200 rounded-md shadow-sm">
                                <Command className="w-3 h-3 text-neutral-500" />
                                <span className="text-[10px] font-bold text-neutral-500">K</span>
                            </div>
                        </div>

                        <div className="max-h-[60vh] overflow-y-auto p-2">
                            {filteredItems.length === 0 ? (
                                <div className="py-12 text-center text-neutral-500">
                                    <p>No results found for "{query}"</p>
                                </div>
                            ) : (
                                <div className="space-y-4 pb-2">
                                    {/* Group items by section */}
                                    {Array.from(new Set(filteredItems.map(i => i.section))).map(section => (
                                        <div key={section}>
                                            <h4 className="px-3 py-2 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                                                {section}
                                            </h4>
                                            <div className="space-y-1">
                                                {filteredItems.filter(i => i.section === section).map((item) => {
                                                    const active = filteredItems.indexOf(item) === selectedIndex;
                                                    const Icon = item.icon;
                                                    return (
                                                        <button
                                                            key={item.id}
                                                            onClick={() => onSelect(item)}
                                                            onMouseEnter={() => setSelectedIndex(filteredItems.indexOf(item))}
                                                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${active
                                                                    ? 'bg-primary-50 text-primary-700 shadow-sm'
                                                                    : 'text-neutral-600 hover:bg-neutral-50'
                                                                }`}
                                                        >
                                                            <div className={`p-1.5 rounded-lg ${active ? 'bg-white shadow-sm' : 'bg-neutral-100'}`}>
                                                                <Icon className={`w-4 h-4 ${item.danger ? 'text-red-500' : ''}`} />
                                                            </div>
                                                            <span className="flex-1 text-sm font-medium text-left">
                                                                {item.label}
                                                            </span>
                                                            {active && (
                                                                <span className="text-[10px] font-bold text-primary-400 uppercase">
                                                                    Return
                                                                </span>
                                                            )}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="px-4 py-3 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between text-[10px] font-medium text-neutral-400">
                            <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1">
                                    <kbd className="px-1.5 py-0.5 bg-white border border-neutral-200 rounded shadow-sm">↑↓</kbd> to navigate
                                </span>
                                <span className="flex items-center gap-1">
                                    <kbd className="px-1.5 py-0.5 bg-white border border-neutral-200 rounded shadow-sm">Enter</kbd> to select
                                </span>
                            </div>
                            <span className="flex items-center gap-1">
                                <kbd className="px-1.5 py-0.5 bg-white border border-neutral-200 rounded shadow-sm">Esc</kbd> to close
                            </span>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
