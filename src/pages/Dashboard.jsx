import StatCard from '../components/StatCard.jsx';
import ContentCard from '../components/ContentCard.jsx';
import EmptyState from '../components/EmptyState.jsx';

export default function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          [Welcome message — this is the overview of your business.]
        </p>
      </div>

      {/* 4-up stat grid. Swap in real values once /api/analytics is wired up. */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Clients" />
        <StatCard label="Active Projects" />
        <StatCard label="Revenue (MTD)" />
        <StatCard label="Engagement" />
      </div>

      {/* Large content area. Replace with your chart, feed, or primary view. */}
      <ContentCard title="Overview">
        <EmptyState
          title="[Your main dashboard view]"
          description="This is the hero panel. Add a chart, recent activity feed, or your most important data here."
        />
      </ContentCard>
    </div>
  );
}
