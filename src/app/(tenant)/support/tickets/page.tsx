'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Ticket as TicketIcon, 
  Plus, 
  Search, 
  Filter,
  Clock,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Paperclip,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  mockTickets, 
  type Ticket, 
  type TicketType, 
  type TicketStatus, 
  type TicketPriority,
  ticketTypeLabels,
  ticketStatusLabels,
  ticketPriorityLabels,
} from '@/lib/mock-data/support';
import { showSuccess, showInfo } from '@/lib/utils/toast';

export default function TicketsPage() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<TicketType | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<TicketStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<TicketPriority | 'all'>('all');

  // Filter tickets
  const filteredTickets = mockTickets.filter(ticket => {
    if (typeFilter !== 'all' && ticket.type !== typeFilter) return false;
    if (statusFilter !== 'all' && ticket.status !== statusFilter) return false;
    if (priorityFilter !== 'all' && ticket.priority !== priorityFilter) return false;
    if (searchQuery && !ticket.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // Calculate stats
  const stats = {
    total: mockTickets.length,
    open: mockTickets.filter(t => t.status === 'open').length,
    inProgress: mockTickets.filter(t => t.status === 'in_progress').length,
    resolved: mockTickets.filter(t => t.status === 'resolved').length,
    avgResolutionTime: '4.2h',
  };

  const getStatusColor = (status: TicketStatus) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-700';
      case 'in_progress':
        return 'bg-amber-100 text-amber-700';
      case 'waiting':
        return 'bg-purple-100 text-purple-700';
      case 'resolved':
        return 'bg-green-100 text-green-700';
      case 'closed':
        return 'bg-neutral-100 text-neutral-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  const getPriorityColor = (priority: TicketPriority) => {
    switch (priority) {
      case 's0':
        return 'bg-red-100 text-red-700 border-red-300';
      case 's1':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      case 's2':
        return 'bg-amber-100 text-amber-700 border-amber-300';
      case 's3':
        return 'bg-neutral-100 text-neutral-700 border-neutral-300';
      default:
        return 'bg-neutral-100 text-neutral-700 border-neutral-300';
    }
  };

  const getTypeColor = (type: TicketType) => {
    const colors: Record<TicketType, string> = {
      incident: 'bg-red-100 text-red-700',
      bug: 'bg-orange-100 text-orange-700',
      service_request: 'bg-blue-100 text-blue-700',
      feature_request: 'bg-purple-100 text-purple-700',
      question: 'bg-green-100 text-green-700',
      task: 'bg-neutral-100 text-neutral-700',
    };
    return colors[type];
  };

  const getSLAStatus = (ticket: Ticket) => {
    const now = new Date();
    const deadline = new Date(ticket.slaDeadline);
    const hoursRemaining = (deadline.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (ticket.status === 'resolved' || ticket.status === 'closed') {
      return { label: 'Met', color: 'text-green-600', icon: CheckCircle };
    }

    if (hoursRemaining < 0) {
      return { label: 'Breached', color: 'text-red-600', icon: AlertTriangle };
    }

    if (hoursRemaining < 2) {
      return { label: `${Math.round(hoursRemaining)}h left`, color: 'text-red-600', icon: AlertCircle };
    }

    if (hoursRemaining < 24) {
      return { label: `${Math.round(hoursRemaining)}h left`, color: 'text-amber-600', icon: Clock };
    }

    return { label: `${Math.round(hoursRemaining / 24)}d left`, color: 'text-neutral-600', icon: Clock };
  };

  const handleCreateTicket = () => {
    showInfo('Create ticket functionality coming soon');
  };

  const handleViewTicket = (ticketId: string) => {
    router.push(`/support/tickets/${ticketId}`);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Support Tickets"
        subtitle="Track and manage support requests"
        showExport={false}
        showHelp={true}
        onHelp={() => showInfo('Create and track support tickets for issues and requests')}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">Total Tickets</p>
                <p className="text-2xl font-bold text-neutral-900">{stats.total}</p>
              </div>
              <TicketIcon className="w-8 h-8 text-primary-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">Open</p>
                <p className="text-2xl font-bold text-blue-600">{stats.open}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">In Progress</p>
                <p className="text-2xl font-bold text-amber-600">{stats.inProgress}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">Resolved</p>
                <p className="text-2xl font-bold text-green-600">{stats.resolved}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">Avg Resolution</p>
                <p className="text-2xl font-bold text-primary-600">{stats.avgResolutionTime}</p>
              </div>
              <Clock className="w-8 h-8 text-primary-600" />
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
                placeholder="Search tickets..."
                className="w-full pl-10 pr-3 py-1.5 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as TicketType | 'all')}
              className="px-3 py-1.5 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Types</option>
              {Object.entries(ticketTypeLabels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as TicketStatus | 'all')}
              className="px-3 py-1.5 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Statuses</option>
              {Object.entries(ticketStatusLabels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as TicketPriority | 'all')}
              className="px-3 py-1.5 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Priorities</option>
              {Object.entries(ticketPriorityLabels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>

            {(typeFilter !== 'all' || statusFilter !== 'all' || priorityFilter !== 'all' || searchQuery) && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setTypeFilter('all');
                  setStatusFilter('all');
                  setPriorityFilter('all');
                  setSearchQuery('');
                }}
              >
                Clear Filters
              </Button>
            )}

            <div className="ml-auto">
              <Button
                variant="primary"
                onClick={handleCreateTicket}
                leftIcon={<Plus className="w-4 h-4" />}
              >
                Create Ticket
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tickets List */}
      {filteredTickets.length === 0 ? (
        <Card>
          <CardContent>
            <div className="text-center py-12">
              <TicketIcon className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
              <p className="text-neutral-600 mb-4">No tickets found matching the filters</p>
              <Button variant="primary" onClick={handleCreateTicket} leftIcon={<Plus className="w-4 h-4" />}>
                Create Your First Ticket
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredTickets.map(ticket => {
            const slaStatus = getSLAStatus(ticket);
            const SLAIcon = slaStatus.icon;

            return (
              <Card 
                key={ticket.id} 
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleViewTicket(ticket.id)}
              >
                <CardContent>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-sm font-mono text-neutral-600">{ticket.id}</span>
                        <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded border ${getPriorityColor(ticket.priority)}`}>
                          {ticketPriorityLabels[ticket.priority]}
                        </span>
                        <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded ${getTypeColor(ticket.type)}`}>
                          {ticketTypeLabels[ticket.type]}
                        </span>
                        <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded capitalize ${getStatusColor(ticket.status)}`}>
                          {ticketStatusLabels[ticket.status]}
                        </span>
                      </div>
                      
                      <h3 className="text-base font-semibold text-neutral-900 mb-1 truncate">
                        {ticket.title}
                      </h3>
                      
                      <p className="text-sm text-neutral-600 mb-3 line-clamp-2">
                        {ticket.description}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-neutral-600">
                        <div className="flex items-center gap-1">
                          <span>Created by {ticket.createdBy}</span>
                        </div>
                        {ticket.assignedTo && (
                          <div className="flex items-center gap-1">
                            <span>• Assigned to {ticket.assignedTo}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <span>• {formatDate(ticket.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-3 ml-auto">
                          {ticket.comments > 0 && (
                            <div className="flex items-center gap-1">
                              <MessageSquare className="w-4 h-4" />
                              <span>{ticket.comments}</span>
                            </div>
                          )}
                          {ticket.attachments > 0 && (
                            <div className="flex items-center gap-1">
                              <Paperclip className="w-4 h-4" />
                              <span>{ticket.attachments}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <div className={`flex items-center gap-1 text-xs font-medium ${slaStatus.color}`}>
                        <SLAIcon className="w-4 h-4" />
                        <span>{slaStatus.label}</span>
                      </div>
                      {ticket.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 justify-end">
                          {ticket.tags.slice(0, 3).map(tag => (
                            <span 
                              key={tag}
                              className="px-2 py-0.5 text-xs bg-neutral-100 text-neutral-700 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
