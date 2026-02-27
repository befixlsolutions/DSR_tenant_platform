'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { showError } from '@/lib/utils/toast';

interface BlockerInlineFormProps {
  onAdd: (blocker: any) => void;
  onCancel: () => void;
}

export default function BlockerInlineForm({ onAdd, onCancel }: BlockerInlineFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<'S0' | 'S1' | 'S2' | 'S3'>('S2');
  const [eta, setEta] = useState('');

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) {
      showError('Please fill in title and description');
      return;
    }

    onAdd({
      title: title.trim(),
      description: description.trim(),
      severity,
      eta: eta || undefined,
      status: 'open',
    });

    // Reset form
    setTitle('');
    setDescription('');
    setSeverity('S2');
    setEta('');
  };

  return (
    <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg space-y-4">
      <h3 className="font-medium text-gray-900">Add New Blocker</h3>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Brief title for the blocker"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the blocker and its impact"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      {/* Severity and ETA */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Severity <span className="text-red-500">*</span>
          </label>
          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value as any)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="S0">S0 - Critical</option>
            <option value="S1">S1 - High</option>
            <option value="S2">S2 - Medium</option>
            <option value="S3">S3 - Low</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ETA (Optional)
          </label>
          <input
            type="date"
            value={eta}
            onChange={(e) => setEta(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <Button variant="secondary" size="sm" onClick={onCancel}>
          Cancel
        </Button>
        <Button size="sm" onClick={handleSubmit}>
          Add Blocker
        </Button>
      </div>
    </div>
  );
}
