'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, Sparkles, TrendingUp, Target, AlertTriangle, MessageSquare } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { showSuccess, showError, showInfo } from '@/lib/utils/toast';

export default function MSRCreatePage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    month: new Date().toISOString().slice(0, 7), // YYYY-MM format
    executive_summary: '',
    goals_outcomes: '',
    delivery_summary: '',
    blocker_analysis: '',
    communication_signals: '',
    employee_reflection: '',
    next_month_focus: ['', '', ''],
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFocusChange = (index: number, value: string) => {
    const newFocus = [...formData.next_month_focus];
    newFocus[index] = value;
    handleChange('next_month_focus', newFocus);
  };

  const addFocusArea = () => {
    handleChange('next_month_focus', [...formData.next_month_focus, '']);
  };

  const removeFocusArea = (index: number) => {
    const newFocus = formData.next_month_focus.filter((_, i) => i !== index);
    handleChange('next_month_focus', newFocus);
  };

  const handleGenerateFromWSRs = () => {
    setIsGenerating(true);
    showInfo('Generating MSR from weekly reports...');

    // Simulate AI generation
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        executive_summary: `This month demonstrated strong execution across key initiatives. Successfully delivered 3 major features with 95% on-time completion rate. Team collaboration improved significantly with reduced blocker resolution time.`,
        goals_outcomes: `Achieved 4 out of 5 monthly goals:\n• Payment gateway integration - Completed\n• API performance optimization - Completed\n• User authentication module - Completed\n• Analytics dashboard - In Progress (80%)\n• Mobile app redesign - Deferred to next month`,
        delivery_summary: `Delivered 12 features, resolved 45 bugs, and completed 3 major refactoring tasks. Average cycle time reduced by 15%. Code quality metrics improved with 92% test coverage.`,
        blocker_analysis: `Encountered 8 blockers this month, resolved 6. Average resolution time: 2.3 days. Key blockers: API documentation delays (S2), infrastructure issues (S1). Implemented better escalation process.`,
        communication_signals: `Maintained excellent communication discipline with 100% DSR compliance and 95% WSR compliance. Proactive in raising blockers and seeking help. Regular updates to stakeholders.`,
        employee_reflection: `Strong month overall. Learned new technologies and improved problem-solving skills. Need to focus more on time estimation accuracy. Grateful for team support on complex challenges.`,
        next_month_focus: [
          'Complete analytics dashboard with all chart types',
          'Start mobile app redesign project',
          'Improve API documentation coverage to 100%',
        ],
      }));
      setIsGenerating(false);
      showSuccess('MSR generated from weekly reports');
    }, 2000);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.month) {
      newErrors.month = 'Month is required';
    }
    if (!formData.executive_summary.trim()) {
      newErrors.executive_summary = 'Executive summary is required';
    }
    if (!formData.goals_outcomes.trim()) {
      newErrors.goals_outcomes = 'Goals & outcomes are required';
    }
    if (!formData.delivery_summary.trim()) {
      newErrors.delivery_summary = 'Delivery summary is required';
    }
    if (!formData.employee_reflection.trim()) {
      newErrors.employee_reflection = 'Employee reflection is required';
    }
    if (formData.next_month_focus.filter(f => f.trim()).length === 0) {
      newErrors.next_month_focus = 'At least one focus area is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveDraft = () => {
    showSuccess('MSR saved as draft');
    router.push('/reporting');
  };

  const handleSubmit = () => {
    if (!validate()) {
      showError('Please fix the errors before submitting');
      return;
    }

    showSuccess('MSR submitted successfully');
    router.push('/reporting');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Create Monthly Status Report (MSR)"
        subtitle="Comprehensive monthly performance summary"
        showExport={false}
        showHelp={true}
        onHelp={() => showInfo('Create your monthly status report with comprehensive insights')}
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => router.push('/reporting')}
              leftIcon={<X className="w-4 h-4" />}
            >
              Cancel
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleSaveDraft}
              leftIcon={<Save className="w-4 h-4" />}
            >
              Save Draft
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSubmit}
              leftIcon={<Save className="w-4 h-4" />}
            >
              Submit MSR
            </Button>
          </div>
        }
      />

      {/* Month Selection & AI Generation */}
      <Card>
        <CardContent>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Month <span className="text-red-500">*</span>
              </label>
              <input
                type="month"
                value={formData.month}
                onChange={(e) => handleChange('month', e.target.value)}
                max={new Date().toISOString().slice(0, 7)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.month ? 'border-red-500' : 'border-neutral-300'
                }`}
              />
              {errors.month && (
                <p className="text-xs text-red-600 mt-1">{errors.month}</p>
              )}
            </div>

            <div className="flex items-end">
              <Button
                variant="primary"
                onClick={handleGenerateFromWSRs}
                disabled={isGenerating}
                leftIcon={<Sparkles className="w-4 h-4" />}
              >
                {isGenerating ? 'Generating...' : 'Generate from WSRs'}
              </Button>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Tip:</strong> Use "Generate from WSRs" to automatically create your MSR from weekly reports. You can then review and edit the content.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Executive Summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary-600" />
            <CardTitle>Executive Summary</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              High-level overview of the month <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.executive_summary}
              onChange={(e) => handleChange('executive_summary', e.target.value)}
              placeholder="Provide a concise executive summary of your month's performance, key achievements, and overall impact..."
              rows={4}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none ${
                errors.executive_summary ? 'border-red-500' : 'border-neutral-300'
              }`}
            />
            {errors.executive_summary && (
              <p className="text-xs text-red-600 mt-1">{errors.executive_summary}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Goals & Outcomes */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary-600" />
            <CardTitle>Goals & Outcomes</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Monthly goals and their outcomes <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.goals_outcomes}
              onChange={(e) => handleChange('goals_outcomes', e.target.value)}
              placeholder="List your monthly goals and their outcomes (achieved, in progress, deferred)..."
              rows={6}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none ${
                errors.goals_outcomes ? 'border-red-500' : 'border-neutral-300'
              }`}
            />
            {errors.goals_outcomes && (
              <p className="text-xs text-red-600 mt-1">{errors.goals_outcomes}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Delivery Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Delivery Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              What was delivered this month <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.delivery_summary}
              onChange={(e) => handleChange('delivery_summary', e.target.value)}
              placeholder="Summarize features delivered, bugs fixed, and other completed work..."
              rows={5}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none ${
                errors.delivery_summary ? 'border-red-500' : 'border-neutral-300'
              }`}
            />
            {errors.delivery_summary && (
              <p className="text-xs text-red-600 mt-1">{errors.delivery_summary}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Blocker Analysis */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <CardTitle>Blocker Analysis</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Blockers encountered and resolution
            </label>
            <textarea
              value={formData.blocker_analysis}
              onChange={(e) => handleChange('blocker_analysis', e.target.value)}
              placeholder="Describe blockers faced, how they were resolved, and lessons learned..."
              rows={4}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            />
          </div>
        </CardContent>
      </Card>

      {/* Communication Signals */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary-600" />
            <CardTitle>Communication Signals</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Communication discipline and collaboration
            </label>
            <textarea
              value={formData.communication_signals}
              onChange={(e) => handleChange('communication_signals', e.target.value)}
              placeholder="Describe your communication patterns, DSR/WSR compliance, proactive updates, and collaboration..."
              rows={4}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            />
          </div>
        </CardContent>
      </Card>

      {/* Employee Reflection */}
      <Card>
        <CardHeader>
          <CardTitle>Employee Reflection</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Your personal reflection on the month <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.employee_reflection}
              onChange={(e) => handleChange('employee_reflection', e.target.value)}
              placeholder="Reflect on what went well, what could be improved, learnings, and growth areas..."
              rows={5}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none ${
                errors.employee_reflection ? 'border-red-500' : 'border-neutral-300'
              }`}
            />
            {errors.employee_reflection && (
              <p className="text-xs text-red-600 mt-1">{errors.employee_reflection}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Next Month Focus */}
      <Card>
        <CardHeader>
          <CardTitle>Next Month Focus Areas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <label className="block text-sm font-medium text-neutral-700">
              Key focus areas for next month <span className="text-red-500">*</span>
            </label>
            {formData.next_month_focus.map((focus, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={focus}
                  onChange={(e) => handleFocusChange(index, e.target.value)}
                  placeholder={`Focus area ${index + 1}...`}
                  className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                {formData.next_month_focus.length > 1 && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => removeFocusArea(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
            {errors.next_month_focus && (
              <p className="text-xs text-red-600">{errors.next_month_focus}</p>
            )}
            <Button
              variant="secondary"
              size="sm"
              onClick={addFocusArea}
            >
              + Add Focus Area
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Help Text */}
      <Card>
        <CardContent>
          <div className="flex items-start gap-3 text-sm text-neutral-600">
            <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2"></div>
            <div>
              <p className="font-medium text-neutral-900 mb-1">MSR Guidelines</p>
              <ul className="space-y-1 text-xs">
                <li>• Be comprehensive but concise - focus on impact and outcomes</li>
                <li>• Use data and metrics to support your summary</li>
                <li>• Be honest about challenges and learnings</li>
                <li>• Highlight collaboration and communication</li>
                <li>• Set clear focus areas for next month</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
