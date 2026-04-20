import ContentCard from '../components/ContentCard.jsx';
import StatCard from '../components/StatCard.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { BarChart3 } from 'lucide-react';

export default function Analytics() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Analytics
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          [Track the numbers that matter to your business.]
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Visitors" />
        <StatCard label="Conversions" />
        <StatCard label="Avg. Session" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ContentCard title="Traffic over time">
          <EmptyState
            icon={BarChart3}
            title="[Chart: your metric over time]"
            description="Drop in a charting library like Recharts, Chart.js, or Tremor and point it at /api/analytics."
          />
        </ContentCard>
        <ContentCard title="Top sources">
          <EmptyState
            icon={BarChart3}
            title="[Chart: breakdown by category]"
            description="A bar or pie chart fits well here once you have data to group."
          />
        </ContentCard>
      </div>
    </div>
  );
}
