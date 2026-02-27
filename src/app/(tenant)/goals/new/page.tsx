'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { showSuccess, showError } from '@/lib/utils/toast';

export default function NewGoalPage() {
  const router = useRouter();

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Development');
  const [relatedProject, setRelatedProject] = useState('');
  const [successCriteria, setSuccessCriteria] = useState<string[]>(['']);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [riskLevel, setRiskLevel] = useState<'low' | 'medium' | 'high'>('low');
  const [dueWeek, setDueWeek] = useState('');
  const [dependencies, setDependencies] = useState<string[]>([]);
  const [newDependency, setNewDependency] = useState('');

  const handleAddSuccessCriteria = () => {
    setSuccessCriteria([...successCriteria, '']);
  };

  const handleRemoveSuccessCriteria = (index: number) => {
    if (successCriteria.length > 1) {
      setSuccessCriteria(successCriteria.filter((_, i) => i !== index));
    }
  };

  const handleUpdateSuccessCriteria = (index: number, value: string) => {
    const updated = [...successCriteria];
    updated[index] = value;
    setSuccessCriteria(updated);
  };

  const handleAddDependency = () => {
    if (newDependency.trim()) {
      setDependencies([...dependencies, newDependency.trim()]);
      setNewDependency('');
    }
  };

  const handleRemoveDependency = (index: number) => {
    setDependencies(dependencies.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!title.trim()) {
      showError('Please enter a goal title');
      return;
    }

    if (!description.trim()) {
      showError('Please enter a goal description');
      return;
    }

    const validCriteria = successCriteria.filter(c => c.trim());
    if (validCriteria.length === 0) {
      showError('Please add at least one success criterion');
      return;
    }

    if (!dueWeek) {
      showError('Please select a due week');
      return;
    }

    // Success
    showSuccess('Goal created successfully! 🎯');
    router.push('/goals/my');
  };

  const handleSaveDraft = () => {
    showSuccess('Goal saved as draft');
    router.push('/goals/my');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push('/goals/my')}
          className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-neutral-600" />
        </button>
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">Create New Goal</h1>
          <p className="text-sm text-neutral-600">Define your goal using the Goal Lifecycle System</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Goal Title <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Complete Payment Gateway Integration"
                  className="input w-full"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Description <span className="text-red-600">*</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what you want to achieve..."
                  rows={4}
                  className="input w-full"
                  required
                />
              </div>

              {/* Category & Project */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Category <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="input w-full"
                    required
                  >
                    <option value="Development">Development</option>
                    <option value="Performance">Performance</option>
                    <option value="Architecture">Architecture</option>
                    <option value="Testing">Testing</option>
                    <option value="Documentation">Documentation</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Related Project
                  </label>
                  <input
                    type="text"
                    value={relatedProject}
                    onChange={(e) => setRelatedProject(e.target.value)}
                    placeholder="e.g., E-commerce Platform"
                    className="input w-full"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Success Criteria */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Success Criteria <span className="text-red-600">*</span></CardTitle>
              <button
                type="button"
                onClick={handleAddSuccessCriteria}
                className="btn btn-secondary btn-sm"
              >
                <Plus className="w-3 h-3 mr-1" />
                Add Criterion
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {successCriteria.map((criterion, index) => (
                <div key={index} className="flex items-start gap-2">
                  <input
                    type="text"
                    value={criterion}
                    onChange={(e) => handleUpdateSuccessCriteria(index, e.target.value)}
                    placeholder={`Success criterion ${index + 1}`}
                    className="input flex-1"
                  />
                  {successCriteria.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSuccessCriteria(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-neutral-600 mt-2">
              Define clear, measurable criteria for success
            </p>
          </CardContent>
        </Card>

        {/* Goal Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Goal Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Priority <span className="text-red-600">*</span>
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="input w-full"
                  required
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              {/* Risk Level */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Risk Level <span className="text-red-600">*</span>
                </label>
                <select
                  value={riskLevel}
                  onChange={(e) => setRiskLevel(e.target.value as any)}
                  className="input w-full"
                  required
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              {/* Due Week */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Due Week <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={dueWeek}
                  onChange={(e) => setDueWeek(e.target.value)}
                  placeholder="e.g., 2026-W10 or March 2026"
                  className="input w-full"
                  required
                />
                <p className="text-xs text-neutral-600 mt-1">
                  Format: YYYY-Www (e.g., 2026-W10) or Month Year
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dependencies */}
        <Card>
          <CardHeader>
            <CardTitle>Dependencies (Optional)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {/* Add Dependency */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newDependency}
                  onChange={(e) => setNewDependency(e.target.value)}
                  placeholder="Enter dependency name"
                  className="input flex-1"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddDependency();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddDependency}
                  className="btn btn-secondary"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Dependencies List */}
              {dependencies.length > 0 && (
                <div className="space-y-2">
                  {dependencies.map((dep, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-neutral-50 rounded-lg"
                    >
                      <span className="text-sm text-neutral-900">{dep}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveDependency(index)}
                        className="text-red-600 hover:bg-red-50 p-1 rounded transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
          <button
            type="button"
            onClick={() => router.push('/goals/my')}
            className="btn btn-ghost"
          >
            Cancel
          </button>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="btn btn-secondary"
            >
              Save as Draft
            </button>
            <button type="submit" className="btn btn-primary">
              Create Goal
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
