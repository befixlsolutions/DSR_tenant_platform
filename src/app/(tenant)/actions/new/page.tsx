'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, Calendar, User, Link as LinkIcon } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ActionPriority, ActionRelatedType } from '@/lib/mock-data/actions';
import { showSuccess, showError, showInfo } from '@/lib/utils/toast';

export default function ActionCreatePage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    owner_id: 'user-1',
    due_date: '',
    priority: 'medium' as ActionPriority,
    related_to_type: '' as ActionRelatedType | '',
    related_to_id: '',
    related_to_title: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.due_date) {
      newErrors.due_date = 'Due date is required';
    }
    if (!formData.owner_id) {
      newErrors.owner_id = 'Owner is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      showError('Please fix the errors before submitting');
      return;
    }

    // In real app, this would call API
    showSuccess('Action created successfully');
    router.push('/actions/my');
  };

  const handleCancel = () => {
    if (formData.title || formData.description) {
      if (confirm('Are you sure you want to discard this action?')) {
        router.push('/actions/my');
      }
    } else {
      router.push('/actions/my');
    }
  };

  // Mock team members for assignment
  const teamMembers = [
    { id: 'user-1', name: 'John Employee' },
    { id: 'user-8', name: 'Jane Developer' },
    { id: 'user-9', name: 'Bob Engineer' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Create Action"
        subtitle="Create a new action item"
        showExport={false}
        showHelp={true}
        onHelp={() => showInfo('Fill in the details to create a new action item')}
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCancel}
              leftIcon={<X className="w-4 h-4" />}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSubmit}
              leftIcon={<Save className="w-4 h-4" />}
            >
              Create Action
            </Button>
          </div>
        }
      />

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Enter action title..."
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.title ? 'border-red-500' : 'border-neutral-300'
                }`}
              />
              {errors.title && (
                <p className="text-xs text-red-600 mt-1">{errors.title}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Describe what needs to be done..."
                rows={4}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none ${
                  errors.description ? 'border-red-500' : 'border-neutral-300'
                }`}
              />
              {errors.description && (
                <p className="text-xs text-red-600 mt-1">{errors.description}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assignment & Priority */}
      <Card>
        <CardHeader>
          <CardTitle>Assignment & Priority</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Assign To <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <select
                  value={formData.owner_id}
                  onChange={(e) => handleChange('owner_id', e.target.value)}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.owner_id ? 'border-red-500' : 'border-neutral-300'
                  }`}
                >
                  <option value="">Select owner...</option>
                  {teamMembers.map(member => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>
              {errors.owner_id && (
                <p className="text-xs text-red-600 mt-1">{errors.owner_id}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Priority <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.priority}
                onChange={(e) => handleChange('priority', e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Due Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="date"
                  value={formData.due_date}
                  onChange={(e) => handleChange('due_date', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.due_date ? 'border-red-500' : 'border-neutral-300'
                  }`}
                />
              </div>
              {errors.due_date && (
                <p className="text-xs text-red-600 mt-1">{errors.due_date}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Related Item (Optional) */}
      <Card>
        <CardHeader>
          <CardTitle>Related Item (Optional)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Related To
                </label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <select
                    value={formData.related_to_type}
                    onChange={(e) => handleChange('related_to_type', e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">None</option>
                    <option value="report">Report (DSR/WSR/MSR)</option>
                    <option value="goal">Goal</option>
                    <option value="blocker">Blocker</option>
                    <option value="review">Review</option>
                    <option value="manual">Manual Entry</option>
                  </select>
                </div>
              </div>

              {formData.related_to_type && formData.related_to_type !== 'manual' && (
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Item ID
                  </label>
                  <input
                    type="text"
                    value={formData.related_to_id}
                    onChange={(e) => handleChange('related_to_id', e.target.value)}
                    placeholder="Enter item ID..."
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              )}
            </div>

            {formData.related_to_type && formData.related_to_type !== 'manual' && (
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Item Title
                </label>
                <input
                  type="text"
                  value={formData.related_to_title}
                  onChange={(e) => handleChange('related_to_title', e.target.value)}
                  placeholder="Enter item title..."
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            )}

            {formData.related_to_type && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Tip:</strong> Linking this action to a related item helps track context and dependencies.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Help Text */}
      <Card>
        <CardContent>
          <div className="flex items-start gap-3 text-sm text-neutral-600">
            <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2"></div>
            <div>
              <p className="font-medium text-neutral-900 mb-1">Action Item Guidelines</p>
              <ul className="space-y-1 text-xs">
                <li>• Be specific and actionable in the title</li>
                <li>• Include clear success criteria in the description</li>
                <li>• Set realistic due dates</li>
                <li>• Assign to the person responsible for execution</li>
                <li>• Link to related items for better tracking</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
