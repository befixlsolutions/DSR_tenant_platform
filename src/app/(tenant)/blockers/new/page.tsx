'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { showSuccess, showError } from '@/lib/utils/toast';
import type { Blocker } from '@/lib/mock-data/blockers';

export default function NewBlockerPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<Blocker['severity']>('S2');
  const [impact, setImpact] = useState('');
  const [owner, setOwner] = useState('');
  const [eta, setEta] = useState('');
  const [relatedToType, setRelatedToType] = useState<'goal' | 'report' | ''>('');
  const [relatedToId, setRelatedToId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      showError('Please enter a blocker title');
      return;
    }

    if (!description.trim()) {
      showError('Please enter a description');
      return;
    }

    if (!impact.trim()) {
      showError('Please describe the impact');
      return;
    }

    showSuccess('Blocker created successfully! 🚧');
    router.push('/blockers/my');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push('/blockers/my')}
          className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-neutral-600" />
        </button>
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">Create New Blocker</h1>
          <p className="text-sm text-neutral-600">Report an issue blocking your progress</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Blocker Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Title <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., API Documentation Incomplete"
                  className="input w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Description <span className="text-red-600">*</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the blocker in detail..."
                  rows={4}
                  className="input w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Severity <span className="text-red-600">*</span>
                </label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value as Blocker['severity'])}
                  className="input w-full"
                  required
                >
                  <option value="S0">S0 - Critical (System down or major functionality broken)</option>
                  <option value="S1">S1 - High (Significant impact on delivery or quality)</option>
                  <option value="S2">S2 - Medium (Moderate impact, workaround available)</option>
                  <option value="S3">S3 - Low (Minor impact, can be worked around)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Impact <span className="text-red-600">*</span>
                </label>
                <textarea
                  value={impact}
                  onChange={(e) => setImpact(e.target.value)}
                  placeholder="Describe how this blocker impacts your work..."
                  rows={3}
                  className="input w-full"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Owner (Optional)
                  </label>
                  <input
                    type="text"
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
                    placeholder="Who will resolve this?"
                    className="input w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    ETA (Optional)
                  </label>
                  <input
                    type="date"
                    value={eta}
                    onChange={(e) => setEta(e.target.value)}
                    className="input w-full"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Link to Goal or Report (Optional)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Related To
                </label>
                <select
                  value={relatedToType}
                  onChange={(e) => setRelatedToType(e.target.value as any)}
                  className="input w-full"
                >
                  <option value="">None</option>
                  <option value="goal">Goal</option>
                  <option value="report">Report</option>
                </select>
              </div>

              {relatedToType && (
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    {relatedToType === 'goal' ? 'Goal ID' : 'Report ID'}
                  </label>
                  <input
                    type="text"
                    value={relatedToId}
                    onChange={(e) => setRelatedToId(e.target.value)}
                    placeholder={`Enter ${relatedToType} ID`}
                    className="input w-full"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
          <button
            type="button"
            onClick={() => router.push('/blockers/my')}
            className="btn btn-ghost"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Create Blocker
          </button>
        </div>
      </form>
    </div>
  );
}
