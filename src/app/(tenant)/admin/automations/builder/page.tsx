'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Save, Eye, Clock, Zap, Settings, AlertCircle } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { showSuccess, showError, showInfo } from '@/lib/utils/toast';
import { AutomationType, TriggerSchedule, automationTypeLabels } from '@/lib/mock-data/automations';

export default function AutomationBuilderPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const automationId = searchParams?.get('id');

  const [name, setName] = useState('New Automation');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<AutomationType>('reporting_reminder');
  const [scheduleType, setScheduleType] = useState<TriggerSchedule>('daily');
  const [time, setTime] = useState('09:00');
  const [dayOfWeek, setDayOfWeek] = useState('Monday');
  const [dayOfMonth, setDayOfMonth] = useState(1);
  const [cronExpression, setCronExpression] = useState('');
  const [enabled, setEnabled] = useState(true);
  
  // Rate limiting
  const [rateLimitEnabled, setRateLimitEnabled] = useState(false);
  const [maxPerHour, setMaxPerHour] = useState(10);
  const [maxPerDay, setMaxPerDay] = useState(100);
  
  // Quiet hours
  const [quietHoursEnabled, setQuietHoursEnabled] = useState(false);
  const [quietStart, setQuietStart] = useState('22:00');
  const [quietEnd, setQuietEnd] = useState('08:00');

  const handleSave = () => {
    if (!name.trim()) {
      showError('Automation name is required');
      return;
    }
    showSuccess('Automation saved successfully');
    router.push('/admin/automations');
  };

  const handleTest = () => {
    showInfo('Automation test run initiated');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={automationId ? 'Edit Automation' : 'Create Automation'}
        subtitle="Configure scheduled tasks and background jobs"
        showExport={false}
        showHelp={true}
        onHelp={() => showInfo('Set up triggers and actions for automated tasks')}
      />

      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle>Automation Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Daily DSR Reminder"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Type <span className="text-red-600">*</span>
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as AutomationType)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {Object.entries(automationTypeLabels).map(([value, label]) => (
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
                placeholder="Describe what this automation does..."
                rows={2}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
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
                <span className="text-sm text-neutral-700">Enable immediately</span>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schedule Configuration */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <CardTitle>Schedule</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Schedule Type
              </label>
              <select
                value={scheduleType}
                onChange={(e) => setScheduleType(e.target.value as TriggerSchedule)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="custom">Custom (Cron)</option>
              </select>
            </div>

            {scheduleType === 'daily' && (
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Time
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            )}

            {scheduleType === 'weekly' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Day of Week
                  </label>
                  <select
                    value={dayOfWeek}
                    onChange={(e) => setDayOfWeek(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            )}

            {scheduleType === 'monthly' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Day of Month
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={31}
                    value={dayOfMonth}
                    onChange={(e) => setDayOfMonth(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            )}

            {scheduleType === 'custom' && (
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Cron Expression
                </label>
                <input
                  type="text"
                  value={cronExpression}
                  onChange={(e) => setCronExpression(e.target.value)}
                  placeholder="e.g., 0 */6 * * *"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <p className="text-xs text-neutral-600 mt-1">
                  Format: minute hour day month day-of-week
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Rate Limiting */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-neutral-600" />
            <CardTitle>Rate Limiting</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rateLimitEnabled}
                onChange={(e) => setRateLimitEnabled(e.target.checked)}
                className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-neutral-700">Enable rate limiting</span>
            </label>

            {rateLimitEnabled && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Max Executions per Hour
                  </label>
                  <input
                    type="number"
                    value={maxPerHour}
                    onChange={(e) => setMaxPerHour(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Max Executions per Day
                  </label>
                  <input
                    type="number"
                    value={maxPerDay}
                    onChange={(e) => setMaxPerDay(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quiet Hours */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-neutral-600" />
            <CardTitle>Quiet Hours</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={quietHoursEnabled}
                onChange={(e) => setQuietHoursEnabled(e.target.checked)}
                className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-neutral-700">Enable quiet hours</span>
            </label>

            {quietHoursEnabled && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={quietStart}
                      onChange={(e) => setQuietStart(e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      End Time
                    </label>
                    <input
                      type="time"
                      value={quietEnd}
                      onChange={(e) => setQuietEnd(e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-blue-700">
                    Automation will not run during quiet hours. Scheduled executions will be skipped.
                  </p>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-between sticky bottom-0 bg-white border-t border-neutral-200 py-4 -mx-6 px-6">
        <Button
          variant="secondary"
          onClick={() => router.push('/admin/automations')}
        >
          Cancel
        </Button>
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            onClick={handleTest}
            leftIcon={<Eye className="w-4 h-4" />}
          >
            Test Run
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            leftIcon={<Save className="w-4 h-4" />}
          >
            Save Automation
          </Button>
        </div>
      </div>
    </div>
  );
}
