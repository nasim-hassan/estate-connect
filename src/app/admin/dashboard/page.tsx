// src/app/admin/dashboard/page.tsx

import StatCard from '@/components/admin/dashboard/StatCard';
import MeetingOverview from '@/components/admin/dashboard/MeetingOverview';
import SiteVisitOverview from '@/components/admin/dashboard/SiteVisitOverview';
import UpcomingSchedule from '@/components/admin/dashboard/UpcomingSchedule';

export default function AdminDashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Welcome to Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Properties" value={128} />
        <StatCard title="Upcoming Meetings" value={12} />
        <StatCard title="Upcoming Visits" value={7} />
        <StatCard title="Live Listings" value={98} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MeetingOverview />
        <SiteVisitOverview />
      </div>

      <UpcomingSchedule />
    </div>
  );
}