// DSR Create Page
'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useRouter } from 'next/navigation';
import StructuredBulletInput from '@/components/reporting/StructuredBulletInput';
import BlockerInlineForm from '@/components/reporting/BlockerInlineForm';
import EvidenceLinkInput from '@/components/reporting/EvidenceLinkInput';
import AutoSaveIndicator from '@/components/reporting/AutoSaveIndicator';
import { showSuccess, showError, showInfo } from '@/lib/utils/toast';
import { Modal } from '@/components/ui/Modal';
import { Check, Copy } from 'lucide-react';

export default function NewDSRPage() {
  const router = useRouter();
  const [reportDate] = useState(new Date().toISOString().split('T')[0]);
  const [whatIDidToday, setWhatIDidToday] = useState<string[]>([]);
  const [tomorrowPlan, setTomorrowPlan] = useState<string[]>([]);
  const [blockers, setBlockers] = useState<any[]>([]);
  const [evidenceLinks, setEvidenceLinks] = useState<string[]>([]);
  const [showBlockerForm, setShowBlockerForm] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleAutoSave();
    }, 30000);

    return () => clearInterval(interval);
  }, [whatIDidToday, tomorrowPlan, blockers, evidenceLinks]);

  const handleAutoSave = () => {
    setIsSaving(true);
    // Simulate save
    setTimeout(() => {
      setLastSaved(new Date());
      setIsSaving(false);
    }, 500);
  };

  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [yesterdayPlan] = useState([
    'Complete the API integration for user management',
    'Draft the technical documentation for the new authentication flow',
    'Review pull requests #145 and #148'
  ]);

  const handleApplyYesterday = () => {
    setWhatIDidToday(yesterdayPlan);
    setIsPreviewModalOpen(false);
    showSuccess('Applied yesterday\'s plan to today\'s report');
  };

  const handleSaveDraft = () => {
    handleAutoSave();
    showSuccess('Draft saved successfully!');
  };

  const handleSubmit = () => {
    if (whatIDidToday.length === 0) {
      showError('Please add at least one item to "What I Did Today"');
      return;
    }
    if (tomorrowPlan.length === 0) {
      showError('Please add at least one item to "Tomorrow\'s Plan"');
      return;
    }

    showSuccess('DSR submitted successfully!');
    router.push('/reporting/inbox');
  };

  const handleAddBlocker = (blocker: any) => {
    setBlockers([...blockers, { ...blocker, id: `blocker-${Date.now()}` }]);
    setShowBlockerForm(false);
  };

  const handleRemoveBlocker = (id: string) => {
    setBlockers(blockers.filter(b => b.id !== id));
  };

  const totalCharacters =
    whatIDidToday.join('').length +
    tomorrowPlan.join('').length;

  return (
    <div className="max-w-4xl mx-auto space-y-5">{/* Removed p-6, added max-w */}
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create Daily Status Report</h1>
          <p className="text-sm text-gray-600 mt-1">{new Date(reportDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <AutoSaveIndicator lastSaved={lastSaved} isSaving={isSaving} />
      </div>

      {/* Quick Actions */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-900">Quick Start</h3>
            <p className="text-sm text-gray-600 mt-1">Copy yesterday's plan to get started faster</p>
          </div>
          <Button variant="secondary" size="sm" onClick={() => setIsPreviewModalOpen(true)}>
            Preview & Copy
          </Button>
        </div>
      </Card>

      {/* What I Did Today */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">What I Did Today</h2>
          <Badge variant="blue">Required</Badge>
        </div>
        <StructuredBulletInput
          value={whatIDidToday}
          onChange={setWhatIDidToday}
          placeholder="Add what you accomplished today..."
        />
      </Card>

      {/* Blockers */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Blockers</h2>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowBlockerForm(!showBlockerForm)}
          >
            {showBlockerForm ? 'Cancel' : 'Add Blocker'}
          </Button>
        </div>

        {showBlockerForm && (
          <div className="mb-4">
            <BlockerInlineForm onAdd={handleAddBlocker} onCancel={() => setShowBlockerForm(false)} />
          </div>
        )}

        {blockers.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>No blockers reported</p>
            <p className="text-sm mt-1">Great! You're on track.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {blockers.map((blocker) => (
              <div key={blocker.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={
                        blocker.severity === 'S0' ? 'red' :
                          blocker.severity === 'S1' ? 'orange' :
                            blocker.severity === 'S2' ? 'yellow' : 'blue'
                      }>
                        {blocker.severity}
                      </Badge>
                      <h3 className="font-medium text-gray-900">{blocker.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{blocker.description}</p>
                    {blocker.eta && (
                      <p className="text-xs text-gray-500 mt-2">ETA: {blocker.eta}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleRemoveBlocker(blocker.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Tomorrow's Plan */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Tomorrow's Plan</h2>
          <Badge variant="blue">Required</Badge>
        </div>
        <StructuredBulletInput
          value={tomorrowPlan}
          onChange={setTomorrowPlan}
          placeholder="Add what you plan to do tomorrow..."
        />
      </Card>

      {/* Evidence Links */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Evidence Links</h2>
          <Badge variant="gray">Optional</Badge>
        </div>
        <EvidenceLinkInput
          value={evidenceLinks}
          onChange={setEvidenceLinks}
        />
      </Card>

      {/* Character Count */}
      <div className="text-center text-sm text-gray-600">
        Total characters: {totalCharacters}
      </div>

      {/* Modal - Same as Yesterday */}
      <Modal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        title="Yesterday's Tomorrow Plan"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsPreviewModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleApplyYesterday}>
              Apply to Today
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Based on your report from yesterday, here is what you planned to accomplish today:
          </p>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2 border border-gray-100">
            {yesterdayPlan.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-gray-200 p-4 shadow-lg lg:ml-64">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="secondary" onClick={() => router.back()}>
              Cancel
            </Button>
            <div className="h-4 w-[1px] bg-gray-300" />
            <span className="text-xs text-gray-500 italic hidden sm:inline">
              Your work is being saved automatically
            </span>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={handleSaveDraft}>
              Save Draft
            </Button>
            <Button onClick={handleSubmit} className="px-8">
              Submit DSR
            </Button>
          </div>
        </div>
      </div>

      {/* Spacer to prevent overlap with sticky bar */}
      <div className="h-24" />
    </div>
  );
}
