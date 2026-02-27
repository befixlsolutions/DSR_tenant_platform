'use client';

import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { motion } from 'framer-motion';
import { User, Mic } from 'lucide-react';

const messages = [
  {
    id: 1,
    sender: 'John Doe',
    message: 'Hello can you check the latest work?',
    time: '12:20',
    isOwn: false,
  },
  {
    id: 2,
    sender: 'Samantha',
    message: '',
    time: '12:20',
    isOwn: true,
    isVoice: true,
    duration: '00:41',
  },
];

export const ChatWidget = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Chat</CardTitle>
          <button className="text-sm text-primary-700 hover:text-primary-800 font-medium">
            See All
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-2 max-w-[80%] ${msg.isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className={`text-xs text-neutral-500 mb-1 ${msg.isOwn ? 'text-right' : ''}`}>
                    {msg.sender}
                  </div>
                  {msg.isVoice ? (
                    <div className="bg-orange-100 rounded-2xl px-4 py-3 flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                        <Mic className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex space-x-1 items-center h-6">
                          {[...Array(20)].map((_, i) => (
                            <div
                              key={i}
                              className="w-1 bg-orange-500 rounded-full"
                              style={{ height: `${Math.random() * 100}%` }}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs font-medium text-orange-800">{msg.duration}</span>
                    </div>
                  ) : (
                    <div className="bg-purple-100 rounded-2xl px-4 py-3">
                      <p className="text-sm text-purple-900">{msg.message}</p>
                    </div>
                  )}
                  <div className="text-xs text-neutral-400 mt-1">{msg.time}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
