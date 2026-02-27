'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Save, 
  Eye, 
  Plus, 
  Trash2, 
  GripVertical, 
  ChevronDown, 
  ChevronUp,
  Settings,
  FileText,
  Type,
  List,
  Hash,
  Calendar,
  Link as LinkIcon,
  CheckSquare,
  AlertCircle
} from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { showSuccess, showError, showInfo } from '@/lib/utils/toast';
import { TemplateType, FieldType, TemplateSection, TemplateField, fieldTypeLabels } from '@/lib/mock-data/templates';

export default function TemplateBuilderPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateId = searchParams?.get('id');

  const [templateName, setTemplateName] = useState('New Template');
  const [templateType, setTemplateType] = useState<TemplateType>('DSR');
  const [description, setDescription] = useState('');
  const [sections, setSections] = useState<TemplateSection[]>([
    {
      id: 'section-1',
      title: 'Section 1',
      description: '',
      order: 1,
      collapsible: false,
      collapsed_by_default: false,
      fields: [],
    },
  ]);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['section-1']));
  const [showWorkflowConfig, setShowWorkflowConfig] = useState(false);

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const addSection = () => {
    const newSection: TemplateSection = {
      id: `section-${Date.now()}`,
      title: `Section ${sections.length + 1}`,
      description: '',
      order: sections.length + 1,
      collapsible: false,
      collapsed_by_default: false,
      fields: [],
    };
    setSections([...sections, newSection]);
    setExpandedSections(new Set([...expandedSections, newSection.id]));
  };

  const removeSection = (sectionId: string) => {
    setSections(sections.filter(s => s.id !== sectionId));
  };

  const updateSection = (sectionId: string, updates: Partial<TemplateSection>) => {
    setSections(sections.map(s => s.id === sectionId ? { ...s, ...updates } : s));
  };

  const addField = (sectionId: string) => {
    const newField: TemplateField = {
      id: `field-${Date.now()}`,
      label: 'New Field',
      field_type: 'text',
      required: false,
    };
    setSections(sections.map(s => 
      s.id === sectionId 
        ? { ...s, fields: [...s.fields, newField] }
        : s
    ));
  };

  const removeField = (sectionId: string, fieldId: string) => {
    setSections(sections.map(s => 
      s.id === sectionId 
        ? { ...s, fields: s.fields.filter(f => f.id !== fieldId) }
        : s
    ));
  };

  const updateField = (sectionId: string, fieldId: string, updates: Partial<TemplateField>) => {
    setSections(sections.map(s => 
      s.id === sectionId 
        ? { 
            ...s, 
            fields: s.fields.map(f => f.id === fieldId ? { ...f, ...updates } : f)
          }
        : s
    ));
  };

  const handleSave = () => {
    if (!templateName.trim()) {
      showError('Template name is required');
      return;
    }
    if (sections.length === 0) {
      showError('At least one section is required');
      return;
    }
    showSuccess('Template saved successfully');
    router.push('/admin/templates');
  };

  const handlePreview = () => {
    showInfo('Template preview will open');
  };

  const getFieldIcon = (fieldType: FieldType) => {
    switch (fieldType) {
      case 'text':
      case 'rich_text':
        return <Type className="w-4 h-4" />;
      case 'structured_bullets':
        return <List className="w-4 h-4" />;
      case 'number':
      case 'currency':
      case 'percentage':
      case 'metric':
        return <Hash className="w-4 h-4" />;
      case 'date':
      case 'week':
        return <Calendar className="w-4 h-4" />;
      case 'link':
        return <LinkIcon className="w-4 h-4" />;
      case 'dropdown':
      case 'multiselect':
        return <CheckSquare className="w-4 h-4" />;
      case 'blocker_object':
      case 'dependency_object':
      case 'risk_object':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={templateId ? 'Edit Template' : 'Create Template'}
        subtitle="Build custom report templates with drag & drop"
        showExport={false}
        showHelp={true}
        onHelp={() => showInfo('Add sections and fields to create your custom template')}
      />

      {/* Template Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle>Template Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Template Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                placeholder="e.g., Engineering DSR Template"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Template Type <span className="text-red-600">*</span>
              </label>
              <select
                value={templateType}
                onChange={(e) => setTemplateType(e.target.value as TemplateType)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="DSR">Daily Status Report (DSR)</option>
                <option value="WSR">Weekly Status Report (WSR)</option>
                <option value="MSR">Monthly Status Report (MSR)</option>
                <option value="QSR">Quarterly Status Report (QSR)</option>
                <option value="YSR">Yearly Status Report (YSR)</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the purpose of this template..."
                rows={2}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sections */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-neutral-900">Template Sections</h2>
          <Button
            variant="secondary"
            size="sm"
            onClick={addSection}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Add Section
          </Button>
        </div>

        {sections.map((section, sectionIndex) => (
          <Card key={section.id} className="border-l-4 border-l-primary-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <GripVertical className="w-5 h-5 text-neutral-400 cursor-move" />
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => updateSection(section.id, { title: e.target.value })}
                    className="flex-1 text-lg font-semibold text-neutral-900 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2 py-1"
                  />
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="p-1 hover:bg-neutral-100 rounded transition-colors"
                  >
                    {expandedSections.has(section.id) ? (
                      <ChevronUp className="w-5 h-5 text-neutral-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-neutral-600" />
                    )}
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-600">{section.fields.length} fields</span>
                  {sections.length > 1 && (
                    <button
                      onClick={() => removeSection(section.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </CardHeader>

            {expandedSections.has(section.id) && (
              <CardContent>
                <div className="space-y-4">
                  {/* Section Description */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Section Description
                    </label>
                    <input
                      type="text"
                      value={section.description || ''}
                      onChange={(e) => updateSection(section.id, { description: e.target.value })}
                      placeholder="Optional description for this section..."
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  {/* Section Options */}
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={section.collapsible}
                        onChange={(e) => updateSection(section.id, { collapsible: e.target.checked })}
                        className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm text-neutral-700">Collapsible</span>
                    </label>
                    {section.collapsible && (
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={section.collapsed_by_default}
                          onChange={(e) => updateSection(section.id, { collapsed_by_default: e.target.checked })}
                          className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                        />
                        <span className="text-sm text-neutral-700">Collapsed by default</span>
                      </label>
                    )}
                  </div>

                  {/* Fields */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-neutral-700">Fields</h4>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => addField(section.id)}
                        leftIcon={<Plus className="w-3 h-3" />}
                      >
                        Add Field
                      </Button>
                    </div>

                    {section.fields.length === 0 ? (
                      <div className="text-center py-8 border-2 border-dashed border-neutral-200 rounded-lg">
                        <FileText className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                        <p className="text-sm text-neutral-600">No fields yet. Add your first field.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {section.fields.map((field) => (
                          <div
                            key={field.id}
                            className="p-4 border border-neutral-200 rounded-lg hover:border-primary-300 transition-colors"
                          >
                            <div className="flex items-start gap-3">
                              <GripVertical className="w-4 h-4 text-neutral-400 cursor-move mt-2" />
                              <div className="flex-1 space-y-3">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                  <div>
                                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                                      Field Label
                                    </label>
                                    <input
                                      type="text"
                                      value={field.label}
                                      onChange={(e) => updateField(section.id, field.id, { label: e.target.value })}
                                      className="w-full px-2 py-1.5 text-sm border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                                      Field Type
                                    </label>
                                    <div className="relative">
                                      <div className="absolute left-2 top-1/2 -translate-y-1/2">
                                        {getFieldIcon(field.field_type)}
                                      </div>
                                      <select
                                        value={field.field_type}
                                        onChange={(e) => updateField(section.id, field.id, { field_type: e.target.value as FieldType })}
                                        className="w-full pl-8 pr-2 py-1.5 text-sm border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                                      >
                                        {Object.entries(fieldTypeLabels).map(([value, label]) => (
                                          <option key={value} value={value}>{label}</option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>
                                  <div className="flex items-end gap-2">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                      <input
                                        type="checkbox"
                                        checked={field.required}
                                        onChange={(e) => updateField(section.id, field.id, { required: e.target.checked })}
                                        className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                                      />
                                      <span className="text-xs text-neutral-700">Required</span>
                                    </label>
                                  </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  <div>
                                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                                      Placeholder
                                    </label>
                                    <input
                                      type="text"
                                      value={field.placeholder || ''}
                                      onChange={(e) => updateField(section.id, field.id, { placeholder: e.target.value })}
                                      className="w-full px-2 py-1.5 text-sm border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                                      Help Text
                                    </label>
                                    <input
                                      type="text"
                                      value={field.help_text || ''}
                                      onChange={(e) => updateField(section.id, field.id, { help_text: e.target.value })}
                                      className="w-full px-2 py-1.5 text-sm border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={() => removeField(section.id, field.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* Workflow Configuration */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowWorkflowConfig(!showWorkflowConfig)}>
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-neutral-600" />
              <CardTitle>Workflow Configuration</CardTitle>
            </div>
            {showWorkflowConfig ? (
              <ChevronUp className="w-5 h-5 text-neutral-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-neutral-600" />
            )}
          </div>
        </CardHeader>
        {showWorkflowConfig && (
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                />
                <span className="text-sm text-neutral-700">Requires manager approval</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                />
                <span className="text-sm text-neutral-700">Allow late submission</span>
              </label>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Auto-lock after (hours)
                </label>
                <input
                  type="number"
                  defaultValue={24}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-between sticky bottom-0 bg-white border-t border-neutral-200 py-4 -mx-6 px-6">
        <Button
          variant="secondary"
          onClick={() => router.push('/admin/templates')}
        >
          Cancel
        </Button>
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            onClick={handlePreview}
            leftIcon={<Eye className="w-4 h-4" />}
          >
            Preview
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            leftIcon={<Save className="w-4 h-4" />}
          >
            Save Template
          </Button>
        </div>
      </div>
    </div>
  );
}
