'use client';

import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

const tasks = [
  {
    id: 1,
    title: 'Research User',
    priority: 'High Priority',
    progress: 50,
    total: 20,
    color: 'bg-blue-100',
    textColor: 'text-blue-800',
    progressColor: 'bg-blue-400',
    team: ['/avatar1.jpg', '/avatar2.jpg', '/avatar3.jpg'],
  },
  {
    id: 2,
    title: 'Explore Design',
    priority: 'High Priority',
    progress: 50,
    total: 20,
    color: 'bg-purple-100',
    textColor: 'text-purple-800',
    progressColor: 'bg-purple-400',
    team: ['/avatar1.jpg', '/avatar2.jpg', '/avatar3.jpg'],
  },
  {
    id: 3,
    title: 'Competitor Research',
    priority: 'High Priority',
    progress: 50,
    total: 20,
    color: 'bg-orange-100',
    textColor: 'text-orange-800',
    progressColor: 'bg-orange-400',
    team: ['/avatar1.jpg', '/avatar2.jpg', '/avatar3.jpg'],
  },
];

export const TodayTasks = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Today Task</CardTitle>
          <button className="text-sm text-primary-700 hover:text-primary-800 font-medium">
            See All
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${task.color} rounded-2xl p-5 space-y-4`}
            >
              <div>
                <Badge variant="secondary" size="sm" className="mb-3">
                  {task.priority}
                </Badge>
                <h3 className={`text-xl font-bold ${task.textColor}`}>
                  {task.title}
                </h3>
              </div>

              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-white border-2 border-white flex items-center justify-center"
                    >
                      <Users className="w-4 h-4 text-neutral-600" />
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full bg-neutral-800 border-2 border-white flex items-center justify-center text-white text-xs font-medium">
                    +16
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className={task.textColor}>Progress</span>
                  <span className={`font-semibold ${task.textColor}`}>
                    {task.progress}/{task.total}
                  </span>
                </div>
                <div className="w-full bg-white/50 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(task.progress / task.total) * 100}%` }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                    className={`${task.progressColor} h-2 rounded-full`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
