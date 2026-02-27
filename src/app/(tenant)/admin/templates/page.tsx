'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, Plus, Edit, Copy, Archive, Eye, Filter, Search } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { mockTemplates, Template, TemplateType } from '@/lib/mock-data/templates';
import { showSuccess, showInfo } from '@/lib/utils/toast';

export default function TemplatesListPage() {
  const router = useRouter();

  const [selectedType, setSelectedType] = useState<TemplateType | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'draft' | 'archived'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter templates
  const filteredTemplates = mockTemplates.filter(template => {
    if (selectedType !== 'all' && template.template_type !== selectedType) return false;
    if (selectedStatus !== 'all' && template.status !== selectedStatus) return false;
    if (searchQuery && !template.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // Group by type
  const templatesByType = {
    DSR: filteredTemplates.filter(t => t.template_type === 'DSR'),
    WSR: filteredTemplates.filter(t => t.template_type === 'WSR'),
    MSR: filteredTemplates.filter(t => t.template_type === 'MSR'),
    QSR: filteredTemplates.filter(t => t.template_type === 'QSR'),
    YSR: filteredTemplates.filter(t => t.template_type === 'YSR'),
  };

  const getStatusColor = (status: Template['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'draft':
        return 'bg-amber-100 text-amber-700';
      case 'archived':
        return 'bg-neutral-100 text-neutral-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  const getTypeColor = (type: TemplateType) => {
    switch (type) {
      case 'DSR':
        return 'bg-blue-100 text-blue-700';
      case 'WSR':
        return 'bg-purple-100 text-purple-700';
      case 'MSR':
        return 'bg-indigo-100 text-indigo-700';
      case 'QSR':
        return 'bg-pink-100 text-pink-700';
      case 'YSR':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  const handleCreateTemplate = () => {
    router.push('/admin/templates/builder');
  };

  const handleEditTemplate = (id: string) => {
    router.push(`/admin/templates/builder?id=${id}`);
  };

  const handleDuplicateTemplate = (template: Template) => {
    showSuccess(`Template "${template.name}" duplicated`);
  };

  const handleArchiveTemplate = (template: Template) => {
    showSuccess(`Template "${template.name}" archived`);
  };

  const handlePreviewTemplate = (id: string) => {
    showInfo('Template preview will open');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Report Templates"
        subtitle="Manage DSR, WSR, and MSR templates for your organization"
        showExport={false}
        showHelp={true}
        onHelp={() => showInfo('Create and manage report templates with custom fields and workflows')}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">Total Templates</p>
                <p className="text-2xl font-bold text-neutral-900">{mockTemplates.length}</p>
              </div>
              <FileText className="w-8 h-8 text-primary-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">Active</p>
                <p className="text-2xl font-bold text-green-600">
                  {mockTemplates.filter(t => t.status === 'active').length}
                </p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-green-600 rounded-full" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">Draft</p>
                <p className="text-2xl font-bold text-amber-600">
                  {mockTemplates.filter(t => t.status === 'draft').length}
                </p>
              </div>
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                <Edit className="w-4 h-4 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">DSR Templates</p>
                <p className="text-2xl font-bold text-blue-600">
                  {mockTemplates.filter(t => t.template_type === 'DSR').length}
                </p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                D
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">WSR Templates</p>
                <p className="text-2xl font-bold text-purple-600">
                  {mockTemplates.filter(t => t.template_type === 'WSR').length}
                </p>
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-sm">
                W
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-neutral-600" />
              <span className="text-sm font-medium text-neutral-700">Filters:</span>
            </div>

            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search templates..."
                className="w-full pl-10 pr-3 py-1.5 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as TemplateType | 'all')}
              className="px-3 py-1.5 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Types</option>
              <option value="DSR">DSR</option>
              <option value="WSR">WSR</option>
              <option value="MSR">MSR</option>
              <option value="QSR">QSR</option>
              <option value="YSR">YSR</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className="px-3 py-1.5 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>

            {(selectedType !== 'all' || selectedStatus !== 'all' || searchQuery) && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setSelectedType('all');
                  setSelectedStatus('all');
                  setSearchQuery('');
                }}
              >
                Clear Filters
              </Button>
            )}

            <div className="ml-auto">
              <Button
                variant="primary"
                onClick={handleCreateTemplate}
                leftIcon={<Plus className="w-4 h-4" />}
              >
                Create Template
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Templates List */}
      {filteredTemplates.length === 0 ? (
        <Card>
          <CardContent>
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
              <p className="text-neutral-600 mb-4">No templates found matching the filters</p>
              <Button variant="primary" onClick={handleCreateTemplate} leftIcon={<Plus className="w-4 h-4" />}>
                Create Your First Template
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredTemplates.map(template => (
            <Card key={template.id} className="hover:shadow-md transition-shadow">
              <CardContent>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-neutral-900">{template.name}</h3>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(template.template_type)}`}>
                        {template.template_type}
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(template.status)}`}>
                        {template.status}
                      </span>
                      <span className="text-xs text-neutral-600">v{template.version}</span>
                    </div>
                    <p className="text-sm text-neutral-600 mb-3">{template.description}</p>
                    <div className="flex items-center gap-6 text-xs text-neutral-600">
                      <div className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        <span>{template.sections.length} sections</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>
                          {template.sections.reduce((sum, s) => sum + s.fields.length, 0)} fields
                        </span>
                      </div>
                      {template.assigned_to?.departments && template.assigned_to.departments.length > 0 && (
                        <div>
                          Assigned to: {template.assigned_to.departments.join(', ')}
                        </div>
                      )}
                      {template.published_at && (
                        <div>
                          Published: {new Date(template.published_at).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handlePreviewTemplate(template.id)}
                      leftIcon={<Eye className="w-4 h-4" />}
                    >
                      Preview
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleEditTemplate(template.id)}
                      leftIcon={<Edit className="w-4 h-4" />}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleDuplicateTemplate(template)}
                      leftIcon={<Copy className="w-4 h-4" />}
                    >
                      Duplicate
                    </Button>
                    {template.status !== 'archived' && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleArchiveTemplate(template)}
                        leftIcon={<Archive className="w-4 h-4" />}
                      >
                        Archive
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
