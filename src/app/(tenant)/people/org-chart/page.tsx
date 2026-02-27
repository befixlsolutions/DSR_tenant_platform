'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users, ChevronDown, ChevronRight, Mail, User } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { mockPeople, getDirectReports, type Person } from '@/lib/mock-data/people';
import { showInfo } from '@/lib/utils/toast';

export default function OrgChartPage() {
  const router = useRouter();
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['user-4', 'user-3', 'user-2']));

  // Find root (person with no manager)
  const root = mockPeople.find(p => !p.manager_id);

  const toggleNode = (personId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(personId)) {
      newExpanded.delete(personId);
    } else {
      newExpanded.add(personId);
    }
    setExpandedNodes(newExpanded);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const renderNode = (person: Person, level: number = 0) => {
    const directReports = getDirectReports(person.id);
    const hasReports = directReports.length > 0;
    const isExpanded = expandedNodes.has(person.id);

    return (
      <div key={person.id} className="relative">
        {/* Person Card */}
        <div
          className={`flex items-start gap-3 p-4 border-2 rounded-lg transition-all ${
            level === 0
              ? 'border-primary-600 bg-primary-50'
              : level === 1
              ? 'border-blue-400 bg-blue-50'
              : level === 2
              ? 'border-green-400 bg-green-50'
              : 'border-neutral-300 bg-white'
          } hover:shadow-md cursor-pointer`}
          onClick={() => router.push(`/people/${person.id}/timeline`)}
        >
          {/* Avatar */}
          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
            level === 0
              ? 'bg-primary-600 text-white'
              : level === 1
              ? 'bg-blue-600 text-white'
              : level === 2
              ? 'bg-green-600 text-white'
              : 'bg-neutral-600 text-white'
          }`}>
            {getInitials(person.name)}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-neutral-900 truncate">{person.name}</h3>
                <p className="text-sm text-neutral-600 truncate">{person.role}</p>
              </div>
              {hasReports && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleNode(person.id);
                  }}
                  className="p-1 hover:bg-neutral-200 rounded transition-colors"
                >
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-neutral-600" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-neutral-600" />
                  )}
                </button>
              )}
            </div>

            <div className="mt-2 space-y-1 text-xs text-neutral-600">
              <div className="flex items-center gap-2">
                <Users className="w-3 h-3" />
                <span>{person.department} • {person.team}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3 h-3" />
                <span className="truncate">{person.email}</span>
              </div>
            </div>

            {hasReports && (
              <div className="mt-2 pt-2 border-t border-neutral-200">
                <p className="text-xs text-neutral-500">
                  {directReports.length} direct report{directReports.length !== 1 ? 's' : ''}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Direct Reports */}
        {hasReports && isExpanded && (
          <div className="ml-8 mt-4 space-y-4 relative">
            {/* Vertical Line */}
            <div className="absolute left-0 top-0 bottom-4 w-px bg-neutral-300" />
            
            {directReports.map((report, idx) => (
              <div key={report.id} className="relative">
                {/* Horizontal Line */}
                <div className="absolute left-0 top-8 w-8 h-px bg-neutral-300" />
                
                <div className="ml-8">
                  {renderNode(report, level + 1)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Organization Chart"
        subtitle="Visual hierarchy of the organization"
        showExport={true}
        onExport={() => showInfo('Exporting org chart...')}
        showHelp={true}
        onHelp={() => showInfo('Click on nodes to expand/collapse. Click on cards to view employee details.')}
      />

      {/* Legend */}
      <Card>
        <CardContent>
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-primary-600 rounded"></div>
              <span className="text-sm text-neutral-700">Executive</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-600 rounded"></div>
              <span className="text-sm text-neutral-700">Director</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-600 rounded"></div>
              <span className="text-sm text-neutral-700">Manager</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-neutral-600 rounded"></div>
              <span className="text-sm text-neutral-700">Individual Contributor</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Org Chart */}
      <Card>
        <CardContent>
          {root ? (
            <div className="py-4">
              {renderNode(root, 0)}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
              <p className="text-neutral-600">No organization structure found</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent>
            <div className="text-center">
              <p className="text-3xl font-bold text-neutral-900">{mockPeople.length}</p>
              <p className="text-sm text-neutral-600 mt-1">Total Employees</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="text-center">
              <p className="text-3xl font-bold text-neutral-900">
                {mockPeople.filter(p => p.direct_reports.length > 0).length}
              </p>
              <p className="text-sm text-neutral-600 mt-1">Managers</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="text-center">
              <p className="text-3xl font-bold text-neutral-900">
                {mockPeople.filter(p => p.direct_reports.length === 0).length}
              </p>
              <p className="text-sm text-neutral-600 mt-1">Individual Contributors</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="text-center">
              <p className="text-3xl font-bold text-neutral-900">
                {Math.max(...mockPeople.map(p => {
                  let depth = 0;
                  let current = p;
                  while (current.manager_id) {
                    depth++;
                    current = mockPeople.find(m => m.id === current.manager_id) || current;
                    if (depth > 10) break; // Safety check
                  }
                  return depth;
                }))}
              </p>
              <p className="text-sm text-neutral-600 mt-1">Org Depth</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
