'use client';

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const data = [
    { name: 'Mon', onTime: 92, late: 5, missed: 3 },
    { name: 'Tue', onTime: 88, late: 8, missed: 4 },
    { name: 'Wed', onTime: 95, late: 3, missed: 2 },
    { name: 'Thu', onTime: 91, late: 6, missed: 3 },
    { name: 'Fri', onTime: 87, late: 9, missed: 4 },
    { name: 'Sat', onTime: 96, late: 2, missed: 2 },
    { name: 'Sun', onTime: 94, late: 4, missed: 2 },
];

export const ComplianceTrendChart = () => {
    return (
        <div className="h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="colorOnTime" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorLate" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#64748b' }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#64748b' }}
                        domain={[0, 100]}
                    />
                    <Tooltip
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Area
                        type="monotone"
                        dataKey="onTime"
                        name="On-Time %"
                        stroke="#10b981"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorOnTime)"
                    />
                    <Area
                        type="monotone"
                        dataKey="late"
                        name="Late %"
                        stroke="#f59e0b"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorLate)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};
