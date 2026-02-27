'use client';

import { useState } from 'react';
import { mockDepartments, mockTeams, mockUsers, type Department, type Team } from '@/lib/mock-data/users';
import { showSuccess } from '@/lib/utils/toast';
import { 
  Building2,
  Users,
  Search,
  Plus,
  Edit,
  Trash2,
  ChevronRight,
  ChevronDown,
  UserCircle,
} from 'lucide-react';

export default function OrgStructurePage() {
  const [departments] = useState<Department[]>(mockDepartments);
  const [teams] = useState<Team[]>(mockTeams);
  const [users] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedDepts, setExpandedDepts] = useState<Set<string>>(new Set(departments.map(d => d.id)));
  const [view, setView] = useState<'hierarchy' | 'list'>('hierarchy');

  // Filter departments and teams
  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate stats
  const stats = {
    totalDepartments: departments.length,
    totalTeams: teams.length,
    totalMembers: departments.reduce((sum, d) => sum + d.memberCount, 0),
    avgTeamSize: Math.round(teams.reduce((sum, t) => sum + t.memberCount, 0) / teams.length),
  };

  const toggleDepartment = (deptId: string) => {
    const newExpanded = new Set(expandedDepts);
    if (newExpanded.has(deptId)) {
      newExpanded.delete(deptId);
    } else {
      newExpanded.add(deptId);
    }
    setExpandedDepts(newExpanded);
  };

  const getTeamsForDepartment = (deptId: string) => {
    return teams.filter(t => t.departmentId === deptId);
  };

  const getUserName = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user?.name || 'Unknown';
  };

  const handleAddDepartment = () => {
    showSuccess('Add department functionality coming soon');
  };

  const handleEditDepartment = (dept: Department) => {
    showSuccess(`Edit department: ${dept.name}`);
  };

  const handleDeleteDepartment = (dept: Department) => {
    if (confirm(`Are you sure you want to delete ${dept.name}?`)) {
      showSuccess(`Department ${dept.name} deleted`);
    }
  };

  const handleAddTeam = (deptId: string) => {
    const dept = departments.find(d => d.id === deptId);
    showSuccess(`Add team to ${dept?.name}`);
  };

  const handleEditTeam = (team: Team) => {
    showSuccess(`Edit team: ${team.name}`);
  };

  const handleDeleteTeam = (team: Team) => {
    if (confirm(`Are you sure you want to delete ${team.name}?`)) {
      showSuccess(`Team ${team.name} deleted`);
    }
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Organization Structure</h1>
        <p className="text-gray-600">Manage departments, teams, and hierarchy</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Departments</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalDepartments}</p>
            </div>
            <Building2 className="w-8 h-8 text-indigo-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Teams</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalTeams}</p>
            </div>
            <Users className="w-8 h-8 text-indigo-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Members</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalMembers}</p>
            </div>
            <UserCircle className="w-8 h-8 text-indigo-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg Team Size</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.avgTeamSize}</p>
            </div>
            <Users className="w-8 h-8 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search departments and teams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setView('hierarchy')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                view === 'hierarchy'
                  ? 'bg-indigo-600 text-white'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Hierarchy
            </button>
            <button
              onClick={() => setView('list')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                view === 'list'
                  ? 'bg-indigo-600 text-white'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              List
            </button>
          </div>

          {/* Add Department Button */}
          <button
            onClick={handleAddDepartment}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            Add Department
          </button>
        </div>
      </div>

      {/* Hierarchy View */}
      {view === 'hierarchy' && (
        <div className="space-y-4">
          {filteredDepartments.map((dept) => {
            const deptTeams = getTeamsForDepartment(dept.id);
            const isExpanded = expandedDepts.has(dept.id);

            return (
              <div key={dept.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {/* Department Header */}
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <button
                        onClick={() => toggleDepartment(dept.id)}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        {isExpanded ? (
                          <ChevronDown className="w-5 h-5" />
                        ) : (
                          <ChevronRight className="w-5 h-5" />
                        )}
                      </button>
                      <Building2 className="w-6 h-6 text-indigo-600" />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{dept.name}</h3>
                        <p className="text-sm text-gray-600">{dept.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Head</p>
                        <p className="text-sm font-medium text-gray-900">{getUserName(dept.headId)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Teams</p>
                        <p className="text-sm font-medium text-gray-900">{dept.teamCount}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Members</p>
                        <p className="text-sm font-medium text-gray-900">{dept.memberCount}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAddTeam(dept.id)}
                          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="Add team"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleEditDepartment(dept)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Edit department"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteDepartment(dept)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete department"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Teams */}
                {isExpanded && deptTeams.length > 0 && (
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {deptTeams.map((team) => (
                        <div
                          key={team.id}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Users className="w-5 h-5 text-indigo-600" />
                              <h4 className="font-semibold text-gray-900">{team.name}</h4>
                            </div>
                            <div className="flex gap-1">
                              <button
                                onClick={() => handleEditTeam(team)}
                                className="p-1 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                                title="Edit team"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteTeam(team)}
                                className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                title="Delete team"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{team.description}</p>
                          <div className="flex items-center justify-between text-sm">
                            <div>
                              <p className="text-gray-500">Lead</p>
                              <p className="font-medium text-gray-900">{getUserName(team.leadId)}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-gray-500">Members</p>
                              <p className="font-medium text-gray-900">{team.memberCount}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* No Teams */}
                {isExpanded && deptTeams.length === 0 && (
                  <div className="p-8 text-center">
                    <Users className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">No teams in this department</p>
                    <button
                      onClick={() => handleAddTeam(dept.id)}
                      className="mt-3 text-sm text-indigo-600 hover:text-indigo-700"
                    >
                      Add first team
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* List View */}
      {view === 'list' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Head
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Teams
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Members
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredDepartments.map((dept) => (
                  <tr key={dept.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Building2 className="w-5 h-5 text-indigo-600" />
                        <div>
                          <p className="font-medium text-gray-900">{dept.name}</p>
                          <p className="text-sm text-gray-500">{dept.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {getUserName(dept.headId)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {dept.teamCount}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {dept.memberCount}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleAddTeam(dept.id)}
                          className="text-indigo-600 hover:text-indigo-900 transition-colors"
                          title="Add team"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleEditDepartment(dept)}
                          className="text-gray-600 hover:text-gray-900 transition-colors"
                          title="Edit department"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteDepartment(dept)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                          title="Delete department"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredDepartments.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <Building2 className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No departments found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search criteria
          </p>
        </div>
      )}
    </div>
  );
}
