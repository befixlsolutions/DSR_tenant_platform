'use client';

import { useState } from 'react';
import { Brain, AlertTriangle, TrendingUp, Copy, Target, FileText, CheckCircle, XCircle, Clock } from 'lucide-react';
import { mockAIInsights } from '@/lib/mock-data/ai';
import { showSuccess } from '@/lib/utils/toast';

export default function AIInsightsPage() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredInsights = mockAIInsights.filter(insight => {
    if (selectedType !== 'all' && insight.type !== selectedType) return false;
    if (selectedSeverity !== 'all' && insight.severity !== selectedSeverity) return false;
    if (selectedStatus !== 'all' && insight.status !== selectedStatus) return false;
    return true;
  });

  const stats = {
    total: mockAIInsights.length,
    new: mockAIInsights.filter(i => i.status === 'new').length,
    critical: mockAIInsights.filter(i => i.severity === 'critical').length,
    avgConfidence: Math.round(mockAIInsights.reduce((sum, i) => sum + i.confidence, 0) / mockAIInsights.length),
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pattern': return <TrendingUp className="w-4 h-4" />;
      case 'duplicate': return <Copy className="w-4 h-4" />;
      case 'risk': return <AlertTriangle className="w-4 h-4" />;
      case 'suggestion': return <FileText className="w-4 h-4" />;
      case 'trend': return <TrendingUp className="w-4 h-4" />;
      default: return <Brain className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <Clock className="w-4 h-4 text-blue-600" />;
      case 'acknowledged': return <CheckCircle className="w-4 h-4 text-amber-600" />;
      case 'resolved': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'dismissed': return <XCircle className="w-4 h-4 text-gray-600" />;
      default: return null;
    }
  };

  const handleAcknowledge = (id: string) => {
    showSuccess('Insight acknowledged');
  };

  const handleResolve = (id: string) => {
    showSuccess('Insight marked as resolved');
  };

  const handleDismiss = (id: string) => {
    showSuccess('Insight dismissed');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">AI Insights</h1>
          <p className="text-gray-600 mt-1">AI-powered patterns, risks, and recommendations</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          Configure AI
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Insights</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">{stats.total}</p>
            </div>
            <Brain className="w-8 h-8 text-indigo-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">New Insights</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">{stats.new}</p>
            </div>
            <Clock className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Critical</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">{stats.critical}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Confidence</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">{stats.avgConfidence}%</p>
            </div>
            <Target className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="pattern">Pattern</option>
              <option value="duplicate">Duplicate</option>
              <option value="risk">Risk</option>
              <option value="suggestion">Suggestion</option>
              <option value="trend">Trend</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Severity</label>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="acknowledged">Acknowledged</option>
              <option value="resolved">Resolved</option>
              <option value="dismissed">Dismissed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Insights List */}
      <div className="space-y-4">
        {filteredInsights.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No insights found matching your filters</p>
          </div>
        ) : (
          filteredInsights.map((insight) => (
            <div
              key={insight.id}
              className={`bg-white rounded-lg border-2 p-6 transition-all hover:shadow-md ${getSeverityColor(insight.severity)}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className={`p-2 rounded-lg ${getSeverityColor(insight.severity)}`}>
                    {getTypeIcon(insight.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{insight.title}</h3>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${getSeverityColor(insight.severity)}`}>
                        {insight.severity}
                      </span>
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                        {insight.type}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">{insight.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        {getStatusIcon(insight.status)}
                        {insight.status}
                      </span>
                      <span>Confidence: {insight.confidence}%</span>
                      <span>{insight.category}</span>
                      <span>{insight.affectedItems.length} items affected</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-4">
                <p className="text-sm font-medium text-indigo-900 mb-1">Recommendation</p>
                <p className="text-sm text-indigo-700">{insight.recommendation}</p>
              </div>

              <div className="flex items-center gap-2">
                {insight.status === 'new' && (
                  <>
                    <button
                      onClick={() => handleAcknowledge(insight.id)}
                      className="px-3 py-1.5 bg-amber-600 text-white text-sm rounded-lg hover:bg-amber-700 transition-colors"
                    >
                      Acknowledge
                    </button>
                    <button
                      onClick={() => handleResolve(insight.id)}
                      className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Resolve
                    </button>
                    <button
                      onClick={() => handleDismiss(insight.id)}
                      className="px-3 py-1.5 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Dismiss
                    </button>
                  </>
                )}
                {insight.status === 'acknowledged' && (
                  <button
                    onClick={() => handleResolve(insight.id)}
                    className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Mark Resolved
                  </button>
                )}
                <button className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
