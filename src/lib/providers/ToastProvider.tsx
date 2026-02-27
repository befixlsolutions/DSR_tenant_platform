'use client';

import { Toaster } from 'react-hot-toast';

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        // Default options
        duration: 4000,
        style: {
          background: '#fff',
          color: '#334155',
          padding: '12px 16px',
          borderRadius: '12px',
          fontSize: '14px',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        },
        // Success
        success: {
          duration: 3000,
          style: {
            background: '#f0fdf4',
            color: '#166534',
            border: '1px solid #86efac',
          },
          iconTheme: {
            primary: '#22c55e',
            secondary: '#f0fdf4',
          },
        },
        // Error
        error: {
          duration: 5000,
          style: {
            background: '#fef2f2',
            color: '#991b1b',
            border: '1px solid #fca5a5',
          },
          iconTheme: {
            primary: '#ef4444',
            secondary: '#fef2f2',
          },
        },
        // Loading
        loading: {
          style: {
            background: '#eff6ff',
            color: '#1e40af',
            border: '1px solid #93c5fd',
          },
          iconTheme: {
            primary: '#3b82f6',
            secondary: '#eff6ff',
          },
        },
      }}
    />
  );
}
