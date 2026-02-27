'use client';

import { useState } from 'react';
import { Brain, Settings, TrendingUp, AlertTriangle, FileText, Target, Copy, Clock } from 'lucide-react';
import { mockAISettings, mockBlockerPatterns, mockProductivityTrends } from '@/lib/mock-data/ai';
import { showSuccess } from '@/lib/utils/toast';

export default function AISettingsPage() {
  const [settings, setSettings] = useState(mockAISettings);
  const [activeTab, setActiveTab] = useState<'settings' | 'patterns' | 'trends'>('settings');

  const handleToggleFeature = (feature: keyof typeof settings.features) => {
    setSettings({
      ...settings,
      features: {
        ...settings.features,
        [feature]: !settings.features[feature],
      },
    });
    showSuccess(`${feature} ${settings.features[feature] ? 'disabled' : 'enabled'}`);
  };

  const handleThresholdChange = (threshold: keyof typeof settings.thresholds, value: number) => {
    setSettings({
      ...settings,
      thresholds: {
        ...settings.thresholds,
        [threshold]: value,
      },
    });
  };

  const handleSaveSettings = () => {
    showSuccess('AI settings saved successfully');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">AI Settings</h1>
          <p className="text-gray-600 mt-1">Configure AI features and thresholds</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1.5 rounded-lg text-sm font-medium ${settings.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
            {settings.enabled ? 'AI Enabled' : 'AI Disabled'}
          </span>
          <button
            onClick={() => setSettings({ ...settings, enabled: !settings.enabled })}
            className={`px-4 py-2 rounded-lg transition-colors ${settings.enabled ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white`}
          >
            {settings.enabled ? 'Disable AI' : 'Enable AI'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 border-b-2 transition-colors ${activeTab === 'settings' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
          >
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </div>
          </button>
          <button
            onClick={() => setActiveTab('patterns')}
            className={`px-4 py-2 border-b-2 transition-colors ${activeTab === 'patterns' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Blocker Patterns
            </div>
          </button>
          <button
            onClick={() => setActiveTab('trends')}
            className={`px-4 py-2 border-b-2 transition-colors ${activeTab === 'trends' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
          >
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Productivity Trends
            </div>
          </button>
        </div>
      </div>

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          {/* AI Features */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">AI Features</h2>
            <div className="space-y-4">
              {Object.entries(settings.features).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="font-medium text-gray-900">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </p>
                    <p className="text-sm text-gray-600 mt-0.5">
                      {key === 'autoSummaries' && 'Automatically generate report summaries'}
                      {key === 'blockerPatterns' && 'Detect recurring blocker patterns'}
                      {key === 'duplicateDetection' && 'Identify duplicate goals and tasks'}
                      {key === 'writingAssistance' && 'Provide writing improvement suggestions'}
                      {key === 'productivityInsights' && 'Generate productivity trend insights'}
                      {key === 'riskScoring' && 'Calculate risk scores for goals'}
                      {key === 'sameAsDayDetection' && 'Detect identical daily reports'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggleFeature(key as keyof typeof settings.features)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${value ? 'bg-indigo-600' : 'bg-gray-300'}`}
                    disabled={!settings.enabled}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${value ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Thresholds */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Detection Thresholds</h2>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Duplicate Confidence</label>
                  <span className="text-sm text-gray-600">{settings.thresholds.duplicateConfidence}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={settings.thresholds.duplicateConfidence}
                  onChange={(e) => handleThresholdChange('duplicateConfidence', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  disabled={!settings.enabled}
                />
                <p className="text-xs text-gray-500 mt-1">Minimum confidence level to flag duplicates</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Low Quality Score</label>
                  <span className="text-sm text-gray-600">{settings.thresholds.lowQualityScore}%</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="80"
                  value={settings.thresholds.lowQualityScore}
                  onChange={(e) => handleThresholdChange('lowQualityScore', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  disabled={!settings.enabled}
                />
                <p className="text-xs text-gray-500 mt-1">Threshold for flagging low-quality reports</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Risk Threshold</label>
                  <span className="text-sm text-gray-600">{settings.thresholds.riskThreshold}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="90"
                  value={settings.thresholds.riskThreshold}
                  onChange={(e) => handleThresholdChange('riskThreshold', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  disabled={!settings.enabled}
                />
                <p className="text-xs text-gray-500 mt-1">Risk score threshold for alerts</p>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSaveSettings}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              disabled={!settings.enabled}
            >
              Save Settings
            </button>
          </div>
        </div>
      )}

      {/* Blocker Patterns Tab */}
      {activeTab === 'patterns' && (
        <div className="space-y-4">
          {mockBlockerPatterns.map((pattern) => (
            <div key={pattern.id} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${pattern.severity === 'high' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{pattern.pattern}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {pattern.occurrences} occurrences • {pattern.affectedUsers.length} users affected
                    </p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${pattern.severity === 'high' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                  {pattern.severity}
                </span>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm font-medium text-gray-900 mb-1">Suggested Solution</p>
                <p className="text-sm text-gray-700">{pattern.suggestedSolution}</p>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>First seen: {new Date(pattern.firstSeen).toLocaleDateString()}</span>
                <span>Last seen: {new Date(pattern.lastSeen).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Productivity Trends Tab */}
      {activeTab === 'trends' && (
        <div className="space-y-4">
          {mockProductivityTrends.map((trend) => (
            <div key={trend.userId} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${trend.trend === 'improving' ? 'bg-green-100 text-green-600' : trend.trend === 'declining' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{trend.userName}</h3>
                    <p className="text-sm text-gray-600 mt-1">{trend.period}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-semibold text-gray-900">{trend.score}</p>
                  <p className={`text-sm font-medium ${trend.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {trend.change >= 0 ? '+' : ''}{trend.change}%
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {trend.insights.map((insight, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-gray-400">•</span>
                    <span>{insight}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
