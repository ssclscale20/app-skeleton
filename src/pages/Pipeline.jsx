import { useState } from 'react';
import {
  Search,
  LayoutGrid,
  List,
  ChevronDown,
  ChevronUp,
  ArrowUpDown,
  Star,
  Pencil,
  Trash2,
} from 'lucide-react';
import StatCard from '../components/StatCard.jsx';
import ContentCard from '../components/ContentCard.jsx';

// Placeholder lead data. Replace with a /api/leads query once Supabase is wired.
const LEADS = [
  {
    id: 1,
    name: 'Example Lead A',
    handle: '@example_a',
    followers: '—',
    bio: 'Example lead — replace with your own data.',
    stage: 'New Lead',
    rating: 0,
    source: '—',
    dealValue: 0,
    added: '—',
  },
  {
    id: 2,
    name: 'Example Lead B',
    handle: '@example_b',
    followers: '—',
    bio: 'Example lead — replace with your own data.',
    stage: 'Contacted',
    rating: 0,
    source: '—',
    dealValue: 0,
    added: '—',
  },
];

const STAGE_STYLES = {
  'New Lead': 'bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-200',
  Contacted: 'bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-200',
  Qualified: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200',
  Won: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200',
  Lost: 'bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200',
};

const COLUMNS = [
  { key: 'profile', label: 'Profile' },
  { key: 'followers', label: 'Followers' },
  { key: 'bio', label: 'Bio' },
  { key: 'stage', label: 'Stage' },
  { key: 'rating', label: 'Rating' },
  { key: 'source', label: 'Source' },
  { key: 'dealValue', label: 'Deal Value' },
  { key: 'added', label: 'Added' },
  { key: 'actions', label: '', sortable: false },
];

function initials(name) {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function formatCurrency(value) {
  return `$${value.toLocaleString()}`;
}

function Stars({ value }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={14}
          className={
            i <= value
              ? 'fill-amber-400 text-amber-400'
              : 'fill-slate-100 text-slate-300'
          }
        />
      ))}
    </div>
  );
}

function Select({ label }) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
    >
      {label}
      <ChevronDown size={14} className="text-slate-400" />
    </button>
  );
}

function SortHeader({ col, sort, onSort }) {
  if (col.sortable === false) {
    return (
      <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
        <span className="sr-only">{col.label || 'Actions'}</span>
      </th>
    );
  }

  const active = sort.key === col.key;
  const Icon = !active ? ArrowUpDown : sort.dir === 'asc' ? ChevronUp : ChevronDown;

  return (
    <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
      <button
        type="button"
        onClick={() => onSort(col.key)}
        className={`inline-flex items-center gap-1 transition-colors ${
          active ? 'text-slate-900' : 'hover:text-slate-700'
        }`}
      >
        {col.label}
        <Icon size={12} className={active ? 'text-slate-900' : 'text-slate-400'} />
      </button>
    </th>
  );
}

export default function Pipeline() {
  const [view, setView] = useState('list');
  // Sort state is UI-only for now. TODO: actually sort LEADS when wired to the API.
  const [sort, setSort] = useState({ key: null, dir: 'asc' });

  const handleSort = (key) => {
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' }
        : { key, dir: 'asc' }
    );
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Pipeline
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          [Track every lead from first touch to closed-won.]
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Pipeline Value" value="$0" />
        <StatCard label="Total Deals" value="0" />
        <StatCard label="Deals Won" value="0" />
        <StatCard label="Won Value" value="$0" />
      </div>

      {/* Filter bar */}
      <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="search"
            placeholder="Search leads..."
            className="w-full rounded-md border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-900 placeholder-slate-400 focus:border-accent focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select label="All Stages" />
          <Select label="All Sources" />
          <Select label="All Ratings" />
        </div>
        <div className="flex items-center gap-1 md:ml-auto">
          <button
            type="button"
            onClick={() => setView('grid')}
            aria-label="Grid view"
            aria-pressed={view === 'grid'}
            className={`rounded-md p-2 transition ${
              view === 'grid'
                ? 'bg-slate-100 text-slate-900'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
            }`}
          >
            <LayoutGrid size={16} />
          </button>
          <button
            type="button"
            onClick={() => setView('list')}
            aria-label="List view"
            aria-pressed={view === 'list'}
            className={`rounded-md p-2 transition ${
              view === 'list'
                ? 'bg-slate-100 text-slate-900'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
            }`}
          >
            <List size={16} />
          </button>
        </div>
      </div>

      {/* Leads table */}
      <ContentCard className="overflow-hidden">
        <div className="-m-5 overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                {COLUMNS.map((col) => (
                  <SortHeader key={col.key} col={col} sort={sort} onSort={handleSort} />
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {LEADS.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700">
                        {initials(lead.name)}
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium text-slate-900">
                          {lead.name}
                        </div>
                        <div className="truncate text-xs text-slate-500">
                          {lead.handle}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">
                    {lead.followers}
                  </td>
                  <td className="max-w-xs truncate px-4 py-3 text-sm text-slate-600">
                    {lead.bio}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${STAGE_STYLES[lead.stage]}`}
                    >
                      {lead.stage}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <Stars value={lead.rating} />
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600">
                    {lead.source}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-slate-900">
                    {lead.dealValue ? formatCurrency(lead.dealValue) : '\u2014'}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-500">
                    {lead.added}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        aria-label={`Edit ${lead.name}`}
                        className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        type="button"
                        aria-label={`Delete ${lead.name}`}
                        className="rounded-md p-1.5 text-slate-500 hover:bg-rose-50 hover:text-rose-600"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ContentCard>
    </div>
  );
}
