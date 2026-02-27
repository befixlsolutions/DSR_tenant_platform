'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Sparkles, Plus, Trash2, Save, Send, FileText } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/lib/providers/AuthProvider';
import { showSuccess, showError, showInfo } from '@/lib/utils/toast';
import { mockDSRReports, DSRReport } from '@/lib/mock-data/reports';

interface NextWeekGoal {
  title: string;
  success_criteria: string[];
  priority: 'low' | 'medium' | 'high';
}

export default function WSRNewPage() {
  const router = useRouter();
  const { user } = useAuth();
  
  const [weekStart, setWeekStart] = useState('2026-02-24');
  const [weekEnd, setWeekEnd] = useState('2026-02-28');
  const [weekSummary, setWeekSummary] = useState('');
  const [keyAchievements, setKeyAchievements] = useState<string[]>(['']);
  const [nextWeekGoals, setNextWeekGoals] = useState<NextWeekGoal[]>([
    { title: '', success_criteria: [''], priority: 'medium' }
  ]);
  const [blockersSummary, setBlockersSummary] = useState('');
  const [aiGenerated, setAiGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingFromDSRs, setIsGeneratingFromDSRs] = useState(false);

  const handleGenerateFromDSRs = async () => {
    setIsGeneratingFromDSRs(true);
    
    // Simulate fetching DSRs for the week
    setTimeout(() => {
      // Filter DSRs for the current week
      const weekDSRs = mockDSRReports.filter(dsr => {
        if (dsr.user_id !== user?.id) return false;
        const dsrDate = new Date(dsr.report_date);
        const start = new Date(weekStart);
        const end = new Date(weekEnd);
        return dsrDate >= start && dsrDate <= end;
      });

      if (weekDSRs.length === 0) {
        showInfo('No DSRs found for this week');
        setIsGeneratingFromDSRs(false);
        return;
      }

      // Auto-rollup: Aggregate all "what_i_did_today" into key achievements
      const allAccomplishments = weekDSRs.flatMap(dsr => dsr.what_i_did_today);
      const uniqueAchievements = [...new Set(allAccomplishments)].filter(a => a.trim());
      setKeyAchievements(uniqueAchievements.length > 0 ? uniqueAchievements : ['']);

      // Auto-rollup: Aggregate blockers
      const allBlockers = weekDSRs.flatMap(dsr => dsr.blockers);
      if (allBlockers.length > 0) {
        const blockerSummary = `Encountered ${allBlockers.length} blocker(s) this week:\n` +
          allBlockers.map(b => `- ${b.title} (${b.severity}): ${b.impact}`).join('\n');
        setBlockersSummary(blockerSummary);
      }

      // Generate week summary from DSRs
      const summaryText = `This week I completed ${uniqueAchievements.length} key tasks across ${weekDSRs.length} working days. ` +
        `Focus areas included ${uniqueAchievements.slice(0, 3).join(', ')}. ` +
        (allBlockers.length > 0 ? `Addressed ${allBlockers.length} blocker(s) during the week.` : 'No major blockers encountered.');
      setWeekSummary(summaryText);

      setIsGeneratingFromDSRs(false);
      showSuccess(`Generated WSR from ${weekDSRs.length} DSR(s)`);
    }, 1500);
  };

  const handleAddAchievement = () => {
    setKeyAchievements([...keyAchievements, '']);
  };

  const handleRemoveAchievement = (index: number) => {
    setKeyAchievements(keyAchievements.filter((_, i) => i !== index));
  };

  const handleAchievementChange = (index: number, value: string) => {
    const updated = [...keyAchievements];
    updated[index] = value;
    setKeyAchievements(updated);
  };

  const handleAddGoal = () => {
    setNextWeekGoals([...nextWeekGoals, { title: '', success_criteria: [''], priority: 'medium' }]);
  };

  const handleRemoveGoal = (index: number) => {
    setNextWeekGoals(nextWeekGoals.filter((_, i) => i !== index));
  };

  const handleGoalChange = (index: number, field: keyof NextWeekGoal, value: any) => {
    const updated = [...nextWeekGoals];
    updated[index] = { ...updated[index], [field]: value };
    setNextWeekGoals(updated);
  };

  const handleAddCriteria = (goalIndex: number) => {
    const updated = [...nextWeekGoals];
    updated[goalIndex].success_criteria.push('');
    setNextWeekGoals(updated);
  };

  const handleRemoveCriteria = (goalIndex: number, criteriaIndex: number) => {
    const updated = [...nextWeekGoals];
    updated[goalIndex].success_criteria = updated[goalIndex].success_criteria.filter((_, i) => i !== criteriaIndex);
    setNextWeekGoals(updated);
  };

  const handleCriteriaChange = (goalIndex: number, criteriaIndex: number, value: string) => {
    const updated = [...nextWeekGoals];
    updated[goalIndex].success_criteria[criteriaIndex] = value;
    setNextWeekGoals(updated);
  };

  const handleGenerateAISummary = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setWeekSummary('This week focused on completing the authentication module and initiating payment gateway integration. Made significant progress on user profile features with improved UI/UX. Team collaboration was strong with multiple code reviews completed.');
      setAiGenerated(true);
      setIsGenerating(false);
      showSuccess('AI summary generated successfully');
    }, 2000);
  };

  const handleSaveDraft = () => {
    showSuccess('WSR saved as draft');
    router.push('/reporting');
  };

  const handleSubmit = () => {
    if (!weekSummary.trim()) {
      showError('Week summary is required');
      return;
    }
    if (keyAchievements.filter(a => a.trim()).length === 0) {
      showError('At least one key achievement is required');
      return;
    }
    showSuccess('WSR submitted successfully');
    router.push('/reporting');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Create Weekly Status Report"
        subtitle="Summarize your week and plan for next week"
        showExport={false}
        showHelp={true}
        onHelp={() => showInfo('WSR auto-rolls up from your DSRs. Add next week goals and submit.')}
      />

      {/* Week Range */}
      <Card>
        <CardHeader>
          <CardTitle>Week Range</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Week Start
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="date"
                  value={weekStart}
                  onChange={(e) => setWeekStart(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Week End
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="date"
                  value={weekEnd}
                  onChange={(e) => setWeekEnd(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Auto-Rollup from DSRs */}
      <Card className="bg-primary-50 border-primary-200">
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-primary-900 mb-1">Auto-Generate from DSRs</h3>
              <p className="text-xs text-primary-700">
                Automatically populate this WSR with data from your DSRs for the selected week range
              </p>
            </div>
            <Button
              variant="primary"
              onClick={handleGenerateFromDSRs}
              disabled={isGeneratingFromDSRs}
              leftIcon={<FileText className="w-4 h-4" />}
            >
              {isGeneratingFromDSRs ? 'Generating...' : 'Generate from DSRs'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Week Summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Week Summary</CardTitle>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleGenerateAISummary}
              disabled={isGenerating}
              leftIcon={<Sparkles className="w-4 h-4" />}
            >
              {isGenerating ? 'Generating...' : 'Generate AI Summary'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <textarea
            value={weekSummary}
            onChange={(e) => setWeekSummary(e.target.value)}
            placeholder="Provide a high-level summary of your week's work..."
            className="w-full h-32 px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
          />
          {aiGenerated && (
            <p className="text-xs text-primary-600 mt-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              AI-generated summary
            </p>
          )}
        </CardContent>
      </Card>

      {/* Key Achievements */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Key Achievements</CardTitle>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleAddAchievement}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Add Achievement
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {keyAchievements.map((achievement, index) => (
              <div key={index} className="flex items-start gap-2">
                <input
                  type="text"
                  value={achievement}
                  onChange={(e) => handleAchievementChange(index, e.target.value)}
                  placeholder={`Achievement ${index + 1}`}
                  className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                {keyAchievements.length > 1 && (
                  <button
                    onClick={() => handleRemoveAchievement(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Week Goals */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Next Week Goals</CardTitle>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleAddGoal}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Add Goal
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {nextWeekGoals.map((goal, goalIndex) => (
              <div key={goalIndex} className="border border-neutral-200 rounded-lg p-4">
                <div className="flex items-start gap-2 mb-3">
                  <input
                    type="text"
                    value={goal.title}
                    onChange={(e) => handleGoalChange(goalIndex, 'title', e.target.value)}
                    placeholder="Goal title"
                    className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <select
                    value={goal.priority}
                    onChange={(e) => handleGoalChange(goalIndex, 'priority', e.target.value)}
                    className="px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  {nextWeekGoals.length > 1 && (
                    <button
                      onClick={() => handleRemoveGoal(goalIndex)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Success Criteria</label>
                  {goal.success_criteria.map((criteria, criteriaIndex) => (
                    <div key={criteriaIndex} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={criteria}
                        onChange={(e) => handleCriteriaChange(goalIndex, criteriaIndex, e.target.value)}
                        placeholder={`Success criteria ${criteriaIndex + 1}`}
                        className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      {goal.success_criteria.length > 1 && (
                        <button
                          onClick={() => handleRemoveCriteria(goalIndex, criteriaIndex)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => handleAddCriteria(goalIndex)}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    + Add Criteria
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Blockers Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Blockers Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            value={blockersSummary}
            onChange={(e) => setBlockersSummary(e.target.value)}
            placeholder="Summarize any blockers encountered this week and their resolution status..."
            className="w-full h-24 px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
          />
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3">
        <Button
          variant="secondary"
          onClick={() => router.push('/reporting')}
        >
          Cancel
        </Button>
        <Button
          variant="secondary"
          onClick={handleSaveDraft}
          leftIcon={<Save className="w-4 h-4" />}
        >
          Save Draft
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          leftIcon={<Send className="w-4 h-4" />}
        >
          Submit WSR
        </Button>
      </div>
    </div>
  );
}
