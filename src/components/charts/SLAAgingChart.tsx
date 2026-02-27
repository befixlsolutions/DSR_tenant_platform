'use client';

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';

const data = [
    { range: '< 4h', count: 12, priority: 'low' },
    { range: '4-8h', count: 8, priority: 'low' },
    { range: '8-12h', count: 15, priority: 'medium' },
    { range: '12-24h', count: 6, priority: 'medium' },
    { range: '24-48h', count: 4, priority: 'high' },
    { range: '> 48h', count: 2, priority: 'critical' },
];

const COLORS = {
    low: '#10b981',      // Emerald-500
    medium: '#f59e0b',   // Amber-500
    high: '#ef4444',     // Red-500
    critical: '#7f1d1d', // Red-900
};

export const SLAAgingChart = () => {
    return (
        <div className="h-[250px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                        dataKey="range"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 11, fill: '#64748b' }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 11, fill: '#64748b' }}
                    />
                    <Tooltip
                        cursor={{ fill: '#f8fafc' }}
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar
                        dataKey="count"
                        radius={[4, 4, 0, 0]}
                        barSize={32}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[entry.priority as keyof typeof COLORS]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
