'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Users, Mail, Phone, MapPin, Filter, User } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { mockPeople, getDepartments, getTeams, getRoles, type Person } from '@/lib/mock-data/people';
import { showInfo } from '@/lib/utils/toast';

export default function DirectoryPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedTeam, setSelectedTeam] = useState<string>('all');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const departments = getDepartments();
  const teams = getTeams();
  const roles = getRoles();

  // Filter people
  const filteredPeople = mockPeople.filter(person => {
    const matchesSearch = searchQuery === '' || 
      person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.role.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = selectedDepartment === 'all' || person.department === selectedDepartment;
    const matchesTeam = selectedTeam === 'all' || person.team === selectedTeam;
    const matchesRole = selectedRole === 'all' || person.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || person.status === selectedStatus;

    return matchesSearch && matchesDepartment && matchesTeam && matchesRole && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'inactive':
        return 'bg-neutral-100 text-neutral-700';
      case 'on_leave':
        return 'bg-amber-100 text-amber-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedDepartment('all');
    setSelectedTeam('all');
    setSelectedRole('all');
    setSelectedStatus('all');
  };

  const hasActiveFilters = searchQuery !== '' || selectedDepartment !== 'all' || 
    selectedTeam !== 'all' || selectedRole !== 'all' || selectedStatus !== 'all';

  return (
    <div className="space-y-6">
      <PageHeader
        title="Employee Directory"
        subtitle="Search and view employee information"
        showExport={true}
        onExport={() => showInfo('Exporting directory...')}
        showHelp={true}
        onHelp={() => showInfo('Search for employees by name, email, role, department, or team')}
      />

      {/* Search and Filters */}
      <Card>
        <CardContent>
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, or role..."
                className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-neutral-600" />
                <span className="text-sm font-medium text-neutral-700">Filters:</span>
              </div>

              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-3 py-1.5 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>

              <select
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="px-3 py-1.5 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Teams</option>
                {teams.map(team => (
                  <option key={team} value={team}>{team}</option>
                ))}
              </select>

              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-3 py-1.5 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Roles</option>
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-1.5 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="on_leave">On Leave</option>
              </select>

              {hasActiveFilters && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleClearFilters}
                >
                  Clear Filters
                </Button>
              )}

              <div className="ml-auto text-sm text-neutral-600">
                Showing {filteredPeople.length} of {mockPeople.length} employees
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employee Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPeople.length === 0 ? (
          <div className="col-span-full">
            <Card>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
                  <p className="text-neutral-600">No employees found matching your criteria</p>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleClearFilters}
                    className="mt-4"
                  >
                    Clear Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          filteredPeople.map(person => (
            <Card
              key={person.id}
              className="hover:border-primary-300 transition-colors cursor-pointer"
              onClick={() => router.push(`/people/${person.id}/timeline`)}
            >
              <CardContent>
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold text-lg flex-shrink-0">
                    {getInitials(person.name)}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-neutral-900 truncate">{person.name}</h3>
                        <p className="text-sm text-neutral-600 truncate">{person.role}</p>
                      </div>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize flex-shrink-0 ${getStatusColor(person.status)}`}>
                        {person.status.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-sm text-neutral-600">
                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="truncate">{person.department} • {person.team}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="truncate">{person.email}</span>
                      </div>
                      {person.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                          <span className="truncate">{person.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="truncate">{person.location}</span>
                      </div>
                    </div>

                    {person.manager_name && (
                      <div className="mt-3 pt-3 border-t border-neutral-200">
                        <p className="text-xs text-neutral-500">Reports to</p>
                        <p className="text-sm font-medium text-neutral-900">{person.manager_name}</p>
                      </div>
                    )}

                    {person.direct_reports.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-neutral-200">
                        <p className="text-xs text-neutral-500">
                          {person.direct_reports.length} direct report{person.direct_reports.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
