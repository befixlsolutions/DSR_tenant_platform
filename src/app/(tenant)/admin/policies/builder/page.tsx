'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Save, 
  Eye, 
  Plus, 
  Trash2,
  Zap,
  Target,
  Settings,
  AlertCircle
} from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { showSuccess, showError, showInfo } from '@/lib/utils/toast';
import { 
  PolicyDomain, 
  TriggerType, 
  ActionType, 
  PolicyCondition,
  PolicyAction,
  policyDomainLabels,
  triggerTypeLabels,
  actionTypeLabels
} from '@/lib/mock-data/policies';

export default function PolicyBuilderPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const policyId = searchParams?.get('id');

  const [policyName, setPolicyName] = useState('New Policy');
  const [description, setDescription] = useState('');
  const [domain, setDomain] = useState<PolicyDomain>('reporting');
  const [triggerType, setTriggerType] = useState<TriggerType>('report_submitted');
  const [conditions, setConditions] = useState<PolicyCondition[]>([
    {
      field: '',
      operator: 'equals',
      value: '',
    },
  ]);
  const [actions, setActions] = useState<PolicyAction[]>([
    {
      type: 'send_notification',
      config: {
        recipient: 'user',
        message: '',
        priority: 'medium',
      },
    },
  ]);
  const [priority, setPriority] = useState(1);
  const [enabled, setEnabled] = useState(true);

  const addCondition = () => {
    setConditions([
      ...conditions,
      {
        field: '',
        operator: 'equals',
        value: '',
        logic: 'AND',
      },
    ]);
  };

  const removeCondition = (index: number) => {
    setConditions(conditions.filter((_, i) => i !== index));
  };

  const updateCondition = (index: number, updates: Partial<PolicyCondition>) => {
    setConditions(conditions.map((c, i) => i === index ? { ...c, ...updates } : c));
  };

  const addAction = () => {
    setActions([
      ...actions,
      {
        type: 'send_notification',
        config: {
          recipient: 'user',
          message: '',
          priority: 'medium',
        },
      },
    ]);
  };

  const removeAction = (index: number) => {
    setActions(actions.filter((_, i) => i !== index));
  };

  const updateAction = (index: number, updates: Partial<PolicyAction>) => {
    setActions(actions.map((a, i) => i === index ? { ...a, ...updates } : a));
  };

  const updateActionConfig = (index: number, key: string, value: any) => {
    setActions(actions.map((a, i) => 
      i === index 
        ? { ...a, config: { ...a.config, [key]: value } }
        : a
    ));
  };

  const handleSave = () => {
    if (!policyName.trim()) {
      showError('Policy name is required');
      return;
    }
    if (conditions.some(c => !c.field || !c.value)) {
      showError('All conditions must be complete');
      return;
    }
    showSuccess('Policy saved successfully');
    router.push('/admin/policies');
  };

  const handleSimulate = () => {
    showInfo('Policy simulation will run with test data');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={policyId ? 'Edit Policy' : 'Create Policy'}
        subtitle="Build IF-THEN rules to automate workflows"
        showExport={false}
        showHelp={true}
        onHelp={() => showInfo('Define triggers and actions to create automated policies')}
      />

      {/* Policy Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle>Policy Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Policy Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={policyName}
                onChange={(e) => setPolicyName(e.target.value)}
                placeholder="e.g., Late DSR Auto-Mark"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Domain <span className="text-red-600">*</span>
              </label>
              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value as PolicyDomain)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {Object.entries(policyDomainLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what this policy does..."
                rows={2}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Priority (Execution Order)
              </label>
              <input
                type="number"
                value={priority}
                onChange={(e) => setPriority(parseInt(e.target.value))}
                min={1}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={(e) => setEnabled(e.target.checked)}
                  className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                />
                <span className="text-sm text-neutral-700">Enable policy immediately</span>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trigger Configuration */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-600" />
            <CardTitle>IF (Trigger)</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Trigger Type <span className="text-red-600">*</span>
              </label>
              <select
                value={triggerType}
                onChange={(e) => setTriggerType(e.target.value as TriggerType)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {Object.entries(triggerTypeLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-neutral-700">Conditions</h4>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={addCondition}
                  leftIcon={<Plus className="w-3 h-3" />}
                >
                  Add Condition
                </Button>
              </div>

              {conditions.map((condition, index) => (
                <div key={index} className="p-4 border border-neutral-200 rounded-lg">
                  {index > 0 && (
                    <div className="mb-3">
                      <select
                        value={condition.logic || 'AND'}
                        onChange={(e) => updateCondition(index, { logic: e.target.value as 'AND' | 'OR' })}
                        className="px-2 py-1 text-sm border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="AND">AND</option>
                        <option value="OR">OR</option>
                      </select>
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 mb-1">
                        Field
                      </label>
                      <input
                        type="text"
                        value={condition.field}
                        onChange={(e) => updateCondition(index, { field: e.target.value })}
                        placeholder="e.g., status"
                        className="w-full px-2 py-1.5 text-sm border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 mb-1">
                        Operator
                      </label>
                      <select
                        value={condition.operator}
                        onChange={(e) => updateCondition(index, { operator: e.target.value as any })}
                        className="w-full px-2 py-1.5 text-sm border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="equals">Equals</option>
                        <option value="not_equals">Not Equals</option>
                        <option value="greater_than">Greater Than</option>
                        <option value="less_than">Less Than</option>
                        <option value="contains">Contains</option>
                        <option value="not_contains">Not Contains</option>
                        <option value="is_empty">Is Empty</option>
                        <option value="is_not_empty">Is Not Empty</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 mb-1">
                        Value
                      </label>
                      <input
                        type="text"
                        value={condition.value}
                        onChange={(e) => updateCondition(index, { value: e.target.value })}
                        placeholder="e.g., draft"
                        className="w-full px-2 py-1.5 text-sm border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div className="flex items-end">
                      {conditions.length > 1 && (
                        <button
                          onClick={() => removeCondition(index)}
                          className="w-full p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 mx-auto" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions Configuration */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-green-600" />
            <CardTitle>THEN (Actions)</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-neutral-700">Actions to Execute</h4>
              <Button
                variant="secondary"
                size="sm"
                onClick={addAction}
                leftIcon={<Plus className="w-3 h-3" />}
              >
                Add Action
              </Button>
            </div>

            {actions.map((action, index) => (
              <div key={index} className="p-4 border border-neutral-200 rounded-lg">
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 mb-1">
                        Action Type
                      </label>
                      <select
                        value={action.type}
                        onChange={(e) => updateAction(index, { type: e.target.value as ActionType })}
                        className="w-full px-2 py-1.5 text-sm border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        {Object.entries(actionTypeLabels).map(([value, label]) => (
                          <option key={value} value={value}>{label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 mb-1">
                        Priority
                      </label>
                      <select
                        value={action.config.priority || 'medium'}
                        onChange={(e) => updateActionConfig(index, 'priority', e.target.value)}
                        className="w-full px-2 py-1.5 text-sm border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>

                  {(action.type === 'send_notification' || action.type === 'send_email' || action.type === 'escalate_to_manager') && (
                    <>
                      <div>
                        <label className="block text-xs font-medium text-neutral-700 mb-1">
                          Recipient
                        </label>
                        <select
                          value={action.config.recipient || 'user'}
                          onChange={(e) => updateActionConfig(index, 'recipient', e.target.value)}
                          className="w-full px-2 py-1.5 text-sm border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="user">User</option>
                          <option value="manager">Manager</option>
                          <option value="dept_admin">Department Admin</option>
                          <option value="hr">HR</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-neutral-700 mb-1">
                          Message
                        </label>
                        <textarea
                          value={action.config.message || ''}
                          onChange={(e) => updateActionConfig(index, 'message', e.target.value)}
                          placeholder="Use {{variable}} for dynamic values"
                          rows={2}
                          className="w-full px-2 py-1.5 text-sm border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                        />
                        <p className="text-xs text-neutral-600 mt-1">
                          Available variables: {`{{user_name}}, {{report_type}}, {{score}}, {{goal_title}}`}
                        </p>
                      </div>
                    </>
                  )}

                  <div className="flex justify-end">
                    {actions.length > 1 && (
                      <button
                        onClick={() => removeAction(index)}
                        className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        Remove Action
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Scope Configuration */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-neutral-600" />
            <CardTitle>Scope (Optional)</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Departments
              </label>
              <input
                type="text"
                placeholder="e.g., Engineering, Product (comma-separated)"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Roles
              </label>
              <input
                type="text"
                placeholder="e.g., MANAGER, EMPLOYEE (comma-separated)"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-blue-700">
              Leave scope empty to apply this policy to all users. Specify departments or roles to limit the policy scope.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-between sticky bottom-0 bg-white border-t border-neutral-200 py-4 -mx-6 px-6">
        <Button
          variant="secondary"
          onClick={() => router.push('/admin/policies')}
        >
          Cancel
        </Button>
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            onClick={handleSimulate}
            leftIcon={<Eye className="w-4 h-4" />}
          >
            Simulate
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            leftIcon={<Save className="w-4 h-4" />}
          >
            Save Policy
          </Button>
        </div>
      </div>
    </div>
  );
}
