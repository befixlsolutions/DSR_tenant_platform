'use client';

import { useState } from 'react';
import { mockRoles, mockPermissions, type Role, type Permission } from '@/lib/mock-data/users';
import { showSuccess } from '@/lib/utils/toast';
import { 
  ShieldCheck,
  Search,
  Plus,
  Edit,
  Trash2,
  Users,
  LockKeyhole,
  Check,
} from 'lucide-react';

export default function RolesPage() {
  const [roles] = useState<Role[]>(mockRoles);
  const [permissions] = useState<Permission[]>(mockPermissions);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [showPermissionMatrix, setShowPermissionMatrix] = useState(false);

  // Filter roles
  const filteredRoles = roles.filter(role => {
    const matchesSearch = role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         role.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || role.type === typeFilter;
    
    return matchesSearch && matchesType;
  });

  // Calculate stats
  const stats = {
    totalRoles: roles.length,
    systemRoles: roles.filter(r => r.type === 'system').length,
    customRoles: roles.filter(r => r.type === 'custom').length,
    totalUsers: roles.reduce((sum, r) => sum + r.userCount, 0),
    totalPermissions: permissions.length,
  };

  // Group permissions by category
  const permissionsByCategory = permissions.reduce((acc, perm) => {
    if (!acc[perm.category]) {
      acc[perm.category] = [];
    }
    acc[perm.category].push(perm);
    return acc;
  }, {} as Record<string, Permission[]>);

  const handleAddRole = () => {
    showSuccess('Add role functionality coming soon');
  };

  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    showSuccess(`Edit role: ${role.name}`);
  };

  const handleDeleteRole = (role: Role) => {
    if (role.type === 'system') {
      showSuccess('Cannot delete system roles');
      return;
    }
    if (confirm(`Are you sure you want to delete ${role.name}?`)) {
      showSuccess(`Role ${role.name} deleted`);
    }
  };

  const handleDuplicateRole = (role: Role) => {
    showSuccess(`Duplicate role: ${role.name}`);
  };

  const hasPermission = (role: Role, permissionId: string) => {
    return role.permissions.includes(permissionId);
  };

  const getRoleBadge = (type: string) => {
    return type === 'system' ? (
      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
        System
      </span>
    ) : (
      <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
        Custom
      </span>
    );
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Roles & Permissions</h1>
        <p className="text-gray-600">Manage roles and permission assignments</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Roles</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalRoles}</p>
            </div>
            <ShieldCheck className="w-8 h-8 text-indigo-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">System Roles</p>
              <p className="text-2xl font-semibold text-blue-600">{stats.systemRoles}</p>
            </div>
            <LockKeyhole className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Custom Roles</p>
              <p className="text-2xl font-semibold text-purple-600">{stats.customRoles}</p>
            </div>
            <Edit className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Users</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalUsers}</p>
            </div>
            <Users className="w-8 h-8 text-gray-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Permissions</p>
              <p className="text-2xl font-semibold text-indigo-600">{stats.totalPermissions}</p>
            </div>
            <Check className="w-8 h-8 text-indigo-600" />
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
                placeholder="Search roles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="system">System</option>
              <option value="custom">Custom</option>
            </select>

            <button
              onClick={() => setShowPermissionMatrix(!showPermissionMatrix)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {showPermissionMatrix ? 'Hide' : 'Show'} Matrix
            </button>

            <button
              onClick={handleAddRole}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <Plus className="w-5 h-5" />
              Create Role
            </button>
          </div>
        </div>
      </div>

      {/* Permission Matrix View */}
      {showPermissionMatrix && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 overflow-x-auto">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Permission Matrix</h2>
          
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Permission</th>
                {filteredRoles.map(role => (
                  <th key={role.id} className="px-4 py-3 text-center text-sm font-medium text-gray-700">
                    <div className="flex flex-col items-center gap-1">
                      <span>{role.name}</span>
                      {getRoleBadge(role.type)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(permissionsByCategory).map(([category, perms]) => (
                <>
                  <tr key={category} className="bg-gray-50">
                    <td colSpan={filteredRoles.length + 1} className="px-4 py-2 text-sm font-semibold text-gray-900 uppercase">
                      {category}
                    </td>
                  </tr>
                  {perms.map(perm => (
                    <tr key={perm.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-700">
                        <div>
                          <p className="font-medium">{perm.name}</p>
                          <p className="text-xs text-gray-500">{perm.description}</p>
                        </div>
                      </td>
                      {filteredRoles.map(role => (
                        <td key={role.id} className="px-4 py-3 text-center">
                          {hasPermission(role, perm.id) && (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRoles.map((role) => (
          <div
            key={role.id}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
                  {getRoleBadge(role.type)}
                </div>
                <p className="text-sm text-gray-600">{role.description}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-200">
              <div>
                <p className="text-xs text-gray-500 mb-1">Users</p>
                <p className="text-lg font-semibold text-gray-900">{role.userCount}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Permissions</p>
                <p className="text-lg font-semibold text-gray-900">{role.permissions.length}</p>
              </div>
            </div>

            {/* Permissions Preview */}
            <div className="mb-4">
              <p className="text-xs font-medium text-gray-700 mb-2">Key Permissions:</p>
              <div className="flex flex-wrap gap-1">
                {role.permissions.slice(0, 3).map(permId => {
                  const perm = permissions.find(p => p.id === permId);
                  return perm ? (
                    <span
                      key={permId}
                      className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                    >
                      {perm.name}
                    </span>
                  ) : null;
                })}
                {role.permissions.length > 3 && (
                  <span className="px-2 py-1 text-xs text-gray-500">
                    +{role.permissions.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => handleEditRole(role)}
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => handleDuplicateRole(role)}
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Duplicate
              </button>
              {role.type === 'custom' && (
                <button
                  onClick={() => handleDeleteRole(role)}
                  className="px-3 py-2 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredRoles.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <ShieldCheck className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No roles found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
}
