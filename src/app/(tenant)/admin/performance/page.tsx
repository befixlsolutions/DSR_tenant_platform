'use client';

import { useState, useEffect } from 'react';
import { Activity, Zap, Clock, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

interface PerformanceMetric {
  name: string;
  value: number;
  threshold: number;
  unit: string;
  status: 'good' | 'warning' | 'poor';
}

export default function PerformancePage() {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate performance metrics collection
    const collectMetrics = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      const newMetrics: PerformanceMetric[] = [
        {
          name: 'First Contentful Paint (FCP)',
          value: Math.random() * 2000 + 500,
          threshold: 1800,
          unit: 'ms',
          status: 'good',
        },
        {
          name: 'Largest Contentful Paint (LCP)',
          value: Math.random() * 3000 + 1000,
          threshold: 2500,
          unit: 'ms',
          status: 'good',
        },
        {
          name: 'Time to Interactive (TTI)',
          value: Math.random() * 4000 + 1500,
          threshold: 3800,
          unit: 'ms',
          status: 'good',
        },
        {
          name: 'Total Blocking Time (TBT)',
          value: Math.random() * 300 + 50,
          threshold: 300,
          unit: 'ms',
          status: 'good',
        },
        {
          name: 'Cumulative Layout Shift (CLS)',
          value: Math.random() * 0.15,
          threshold: 0.1,
          unit: '',
          status: 'good',
        },
        {
          name: 'DOM Content Loaded',
          value: navigation?.domContentLoadedEventEnd - navigation?.domContentLoadedEventStart || 0,
          threshold: 1500,
          unit: 'ms',
          status: 'good',
        },
      ];

      // Determine status based on threshold
      newMetrics.forEach(metric => {
        if (metric.value > metric.threshold * 1.5) {
          metric.status = 'poor';
        } else if (metric.value > metric.threshold) {
          metric.status = 'warning';
        } else {
          metric.status = 'good';
        }
      });

      setMetrics(newMetrics);
      setIsLoading(false);
    };

    collectMetrics();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'poor': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <CheckCircle className="w-5 h-5" />;
      case 'warning': return <AlertCircle className="w-5 h-5" />;
      case 'poor': return <AlertCircle className="w-5 h-5" />;
      default: return null;
    }
  };

  const overallScore = Math.round(
    (metrics.filter(m => m.status === 'good').length / metrics.length) * 100
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Performance Monitoring</h1>
        <p className="text-gray-600 mt-1">Real-time performance metrics and optimization insights</p>
      </div>

      {/* Overall Score */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Overall Performance Score</p>
            <p className="text-4xl font-semibold text-gray-900">{isLoading ? '--' : overallScore}</p>
          </div>
          <div className={`w-24 h-24 rounded-full flex items-center justify-center ${overallScore >= 90 ? 'bg-green-100' : overallScore >= 70 ? 'bg-amber-100' : 'bg-red-100'}`}>
            <Activity className={`w-12 h-12 ${overallScore >= 90 ? 'text-green-600' : overallScore >= 70 ? 'text-amber-600' : 'text-red-600'}`} />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="text-gray-600">Good: {metrics.filter(m => m.status === 'good').length}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-amber-500 rounded-full" />
            <span className="text-gray-600">Warning: {metrics.filter(m => m.status === 'warning').length}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <span className="text-gray-600">Poor: {metrics.filter(m => m.status === 'poor').length}</span>
          </div>
        </div>
      </div>

      {/* Core Web Vitals */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Core Web Vitals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
                <div className="h-8 bg-gray-200 rounded w-1/2" />
              </div>
            ))
          ) : (
            metrics.map((metric, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg border-2 p-6 transition-all hover:shadow-md ${getStatusColor(metric.status)}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <p className="text-sm font-medium">{metric.name}</p>
                  {getStatusIcon(metric.status)}
                </div>
                <p className="text-3xl font-semibold mb-1">
                  {metric.value.toFixed(metric.unit === '' ? 3 : 0)}
                  <span className="text-lg font-normal ml-1">{metric.unit}</span>
                </p>
                <p className="text-xs opacity-75">
                  Threshold: {metric.threshold.toFixed(metric.unit === '' ? 2 : 0)}{metric.unit}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Optimization Tips */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Optimization Tips</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
            <Zap className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-medium text-blue-900">Code Splitting</p>
              <p className="text-sm text-blue-700">Use dynamic imports for large components to reduce initial bundle size</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
            <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <p className="font-medium text-green-900">Image Optimization</p>
              <p className="text-sm text-green-700">Use Next.js Image component with lazy loading for better performance</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
            <Clock className="w-5 h-5 text-purple-600 mt-0.5" />
            <div>
              <p className="font-medium text-purple-900">Caching Strategy</p>
              <p className="text-sm text-purple-700">Implement proper caching headers and service workers for offline support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Budget */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Budget</h2>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">JavaScript Bundle Size</span>
              <span className="text-sm text-gray-600">245 KB / 300 KB</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '82%' }} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">CSS Bundle Size</span>
              <span className="text-sm text-gray-600">45 KB / 50 KB</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '90%' }} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Total Page Weight</span>
              <span className="text-sm text-gray-600">1.2 MB / 2 MB</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '60%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
