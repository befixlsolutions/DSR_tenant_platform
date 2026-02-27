'use client';

import { useState } from 'react';
import { Eye, Keyboard, MousePointer, Volume2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface AccessibilityCheck {
  category: string;
  checks: {
    name: string;
    status: 'pass' | 'fail' | 'warning';
    description: string;
  }[];
}

export default function AccessibilityPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'wcag' | 'keyboard' | 'screen-reader'>('overview');

  const accessibilityChecks: AccessibilityCheck[] = [
    {
      category: 'Visual',
      checks: [
        { name: 'Color Contrast', status: 'pass', description: 'All text meets WCAG AA contrast ratio (4.5:1)' },
        { name: 'Focus Indicators', status: 'pass', description: 'Visible focus indicators on all interactive elements' },
        { name: 'Text Sizing', status: 'pass', description: 'Text can be resized up to 200% without loss of content' },
        { name: 'Color Independence', status: 'pass', description: 'Information not conveyed by color alone' },
      ],
    },
    {
      category: 'Keyboard Navigation',
      checks: [
        { name: 'Tab Order', status: 'pass', description: 'Logical tab order throughout the application' },
        { name: 'Keyboard Shortcuts', status: 'pass', description: 'All functionality accessible via keyboard' },
        { name: 'Focus Trap', status: 'pass', description: 'Modals and dialogs properly trap focus' },
        { name: 'Skip Links', status: 'warning', description: 'Skip to content link available but could be improved' },
      ],
    },
    {
      category: 'Screen Reader',
      checks: [
        { name: 'ARIA Labels', status: 'pass', description: 'All interactive elements have proper labels' },
        { name: 'Semantic HTML', status: 'pass', description: 'Proper use of semantic HTML elements' },
        { name: 'Alt Text', status: 'pass', description: 'All images have descriptive alt text' },
        { name: 'Live Regions', status: 'warning', description: 'Some dynamic content updates could use aria-live' },
      ],
    },
    {
      category: 'Forms',
      checks: [
        { name: 'Label Association', status: 'pass', description: 'All form inputs have associated labels' },
        { name: 'Error Messages', status: 'pass', description: 'Clear error messages with suggestions' },
        { name: 'Required Fields', status: 'pass', description: 'Required fields clearly indicated' },
        { name: 'Input Types', status: 'pass', description: 'Appropriate input types for mobile keyboards' },
      ],
    },
  ];

  const overallStats = {
    total: accessibilityChecks.reduce((sum, cat) => sum + cat.checks.length, 0),
    passed: accessibilityChecks.reduce((sum, cat) => sum + cat.checks.filter(c => c.status === 'pass').length, 0),
    warnings: accessibilityChecks.reduce((sum, cat) => sum + cat.checks.filter(c => c.status === 'warning').length, 0),
    failed: accessibilityChecks.reduce((sum, cat) => sum + cat.checks.filter(c => c.status === 'fail').length, 0),
  };

  const score = Math.round((overallStats.passed / overallStats.total) * 100);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-amber-600" />;
      case 'fail': return <XCircle className="w-5 h-5 text-red-600" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass': return 'bg-green-50 border-green-200';
      case 'warning': return 'bg-amber-50 border-amber-200';
      case 'fail': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Accessibility Checker</h1>
        <p className="text-gray-600 mt-1">WCAG 2.1 Level AA compliance monitoring</p>
      </div>

      {/* Overall Score */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Accessibility Score</p>
            <p className="text-4xl font-semibold text-gray-900">{score}%</p>
            <p className="text-sm text-gray-600 mt-2">
              {score >= 95 ? 'Excellent' : score >= 85 ? 'Good' : score >= 70 ? 'Fair' : 'Needs Improvement'}
            </p>
          </div>
          <div className={`w-24 h-24 rounded-full flex items-center justify-center ${score >= 90 ? 'bg-green-100' : score >= 70 ? 'bg-amber-100' : 'bg-red-100'}`}>
            <Eye className={`w-12 h-12 ${score >= 90 ? 'text-green-600' : score >= 70 ? 'text-amber-600' : 'text-red-600'}`} />
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-semibold text-green-600">{overallStats.passed}</p>
            <p className="text-sm text-gray-600">Passed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-semibold text-amber-600">{overallStats.warnings}</p>
            <p className="text-sm text-gray-600">Warnings</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-semibold text-red-600">{overallStats.failed}</p>
            <p className="text-sm text-gray-600">Failed</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 border-b-2 transition-colors ${activeTab === 'overview' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('wcag')}
            className={`px-4 py-2 border-b-2 transition-colors ${activeTab === 'wcag' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
          >
            WCAG Guidelines
          </button>
          <button
            onClick={() => setActiveTab('keyboard')}
            className={`px-4 py-2 border-b-2 transition-colors ${activeTab === 'keyboard' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
          >
            Keyboard Navigation
          </button>
          <button
            onClick={() => setActiveTab('screen-reader')}
            className={`px-4 py-2 border-b-2 transition-colors ${activeTab === 'screen-reader' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
          >
            Screen Reader
          </button>
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {accessibilityChecks.map((category, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">{category.category}</h2>
              <div className="space-y-3">
                {category.checks.map((check, checkIndex) => (
                  <div
                    key={checkIndex}
                    className={`flex items-start gap-3 p-4 rounded-lg border ${getStatusColor(check.status)}`}
                  >
                    {getStatusIcon(check.status)}
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{check.name}</p>
                      <p className="text-sm text-gray-600 mt-1">{check.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* WCAG Guidelines Tab */}
      {activeTab === 'wcag' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">WCAG 2.1 Level AA Compliance</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium text-green-900">Perceivable</p>
                <p className="text-sm text-green-700 mt-1">Information and UI components are presentable to users in ways they can perceive</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium text-green-900">Operable</p>
                <p className="text-sm text-green-700 mt-1">UI components and navigation are operable via keyboard and other input methods</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium text-green-900">Understandable</p>
                <p className="text-sm text-green-700 mt-1">Information and operation of UI are understandable to all users</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
              <div>
                <p className="font-medium text-amber-900">Robust</p>
                <p className="text-sm text-amber-700 mt-1">Content can be interpreted by a wide variety of user agents, including assistive technologies</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Keyboard Navigation Tab */}
      {activeTab === 'keyboard' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Keyboard Shortcuts</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Keyboard className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">Navigate forward</span>
              </div>
              <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-sm font-mono">Tab</kbd>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Keyboard className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">Navigate backward</span>
              </div>
              <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-sm font-mono">Shift + Tab</kbd>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Keyboard className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">Activate element</span>
              </div>
              <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-sm font-mono">Enter / Space</kbd>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Keyboard className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">Close modal</span>
              </div>
              <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-sm font-mono">Esc</kbd>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Keyboard className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">Skip to content</span>
              </div>
              <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-sm font-mono">Tab (on page load)</kbd>
            </div>
          </div>
        </div>
      )}

      {/* Screen Reader Tab */}
      {activeTab === 'screen-reader' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Screen Reader Support</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
              <Volume2 className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-blue-900">NVDA (Windows)</p>
                <p className="text-sm text-blue-700 mt-1">Fully supported with proper ARIA labels and semantic HTML</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
              <Volume2 className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-blue-900">JAWS (Windows)</p>
                <p className="text-sm text-blue-700 mt-1">Compatible with all interactive elements and dynamic content</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
              <Volume2 className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-blue-900">VoiceOver (macOS/iOS)</p>
                <p className="text-sm text-blue-700 mt-1">Optimized for Apple devices with proper landmarks and roles</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
              <Volume2 className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-blue-900">TalkBack (Android)</p>
                <p className="text-sm text-blue-700 mt-1">Mobile-optimized with touch-friendly targets and clear labels</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
