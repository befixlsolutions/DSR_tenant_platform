import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { TodayTasks } from '@/components/dashboard/TodayTasks';
import { ProjectCompletion } from '@/components/dashboard/ProjectCompletion';
import { RankPerformance } from '@/components/dashboard/RankPerformance';
import { TrackerDetail } from '@/components/dashboard/TrackerDetail';
import { ChatWidget } from '@/components/dashboard/ChatWidget';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Dashboard</h1>
            <p className="text-neutral-600 mt-1">Welcome back! Here's your performance overview</p>
          </div>
          <button className="btn btn-primary">
            + New Project
          </button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Tasks */}
          <div className="lg:col-span-2 space-y-6">
            <TodayTasks />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RankPerformance />
              <TrackerDetail />
            </div>
          </div>

          {/* Right Column - Stats & Chat */}
          <div className="space-y-6">
            <ProjectCompletion />
            <ChatWidget />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
