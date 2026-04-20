import { useEffect, useState } from 'react';
import { Plus, MoreHorizontal, X, Terminal } from 'lucide-react';

// ---------------------------------------------------------------------------
// Placeholder agents. Replace with a /api/agents query once the backend is
// wired up. Each agent has a `kind` of either 'assistant' (scheduled, internal)
// or 'consultant' (interactive, client-facing).
// ---------------------------------------------------------------------------

const ASSISTANTS = [
  {
    id: 'example-assistant',
    name: 'Example Assistant',
    description: 'An example scheduled agent. Replace with your own.',
    schedule: 'Every Monday at 9:00 AM',
    status: 'paused',
    stats: { runs: 0, last: '—', items: 0 },
    lastOutput: 'Last output will appear here once the agent runs.',
  },
];

const CONSULTANTS = [
  {
    id: 'example-consultant',
    name: 'Example Consultant',
    description: 'An example interactive agent. Replace with your own.',
    status: 'paused',
    stats: { conversations: 0, activeMembers: 0, weekSessions: 0 },
    recentTopics: ['Example topic 1', 'Example topic 2'],
  },
];

const STATUS_META = {
  running: { label: 'Running', dot: 'bg-emerald-500' },
  paused: { label: 'Paused', dot: 'bg-amber-500' },
  error: { label: 'Error', dot: 'bg-rose-500' },
};

// ---------------------------------------------------------------------------
// Shared subcomponents
// ---------------------------------------------------------------------------

function StatusDot({ status }) {
  const meta = STATUS_META[status];
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
      <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
      {meta.label}
    </span>
  );
}

function ActionsMenu({ items }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100"
        aria-label="Open actions menu"
      >
        <MoreHorizontal size={16} />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-10 mt-1 w-44 overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg">
          {items.map((label) => (
            <button
              key={label}
              type="button"
              className="block w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function MetaLine({ parts }) {
  return (
    <div className="text-[12px] leading-5 text-slate-500">
      {parts.map((part, i) => (
        <span key={i}>
          {i > 0 && <span className="mx-1.5 text-slate-300">&middot;</span>}
          <span>
            {part.label}{' '}
            <span className="text-slate-700">{part.value}</span>
          </span>
        </span>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Cards
// ---------------------------------------------------------------------------

function AssistantCard({ agent }) {
  const actionLabel = agent.status === 'paused' ? 'Resume' : 'Pause';

  return (
    <div className="flex flex-col rounded-lg border border-slate-200 bg-white p-5 transition-colors hover:border-slate-300">
      <div className="flex items-start justify-between gap-3">
        <h3 className="truncate pr-2 text-[15px] font-semibold tracking-tight text-slate-900">
          {agent.name}
        </h3>
        <div className="flex flex-none items-center gap-3">
          <StatusDot status={agent.status} />
          <ActionsMenu items={['View Full Output', 'Edit', actionLabel]} />
        </div>
      </div>

      <p className="mt-1 text-sm text-slate-600">{agent.description}</p>

      <div className="mt-3 text-[12px] text-slate-500">{agent.schedule}</div>

      <div className="mt-2">
        <MetaLine
          parts={[
            { label: 'Runs', value: agent.stats.runs },
            { label: 'Last', value: agent.stats.last },
            { label: 'Items processed', value: agent.stats.items },
          ]}
        />
      </div>

      <div className="mt-4 rounded-md border border-slate-100 bg-slate-50/60 p-3">
        <div className="mb-1 text-[12px] text-slate-500">Last output</div>
        <p className="line-clamp-3 text-[13px] leading-relaxed text-slate-700">
          {agent.lastOutput}
        </p>
      </div>
    </div>
  );
}

function ConsultantCard({ agent }) {
  const actionLabel = agent.status === 'running' ? 'Disable' : 'Enable';

  return (
    <div className="flex flex-col rounded-lg border border-slate-200 bg-white p-5 transition-colors hover:border-slate-300">
      <div className="flex items-start justify-between gap-3">
        <h3 className="truncate pr-2 text-[15px] font-semibold tracking-tight text-slate-900">
          {agent.name}
        </h3>
        <div className="flex flex-none items-center gap-3">
          <StatusDot status={agent.status} />
          <ActionsMenu items={['View Conversations', 'Edit', actionLabel]} />
        </div>
      </div>

      <p className="mt-1 text-sm text-slate-600">{agent.description}</p>

      <div className="mt-3">
        <MetaLine
          parts={[
            { label: 'Conversations', value: agent.stats.conversations },
            { label: 'Active members', value: agent.stats.activeMembers },
            { label: 'This week', value: `${agent.stats.weekSessions} sessions` },
          ]}
        />
      </div>

      <div className="mt-4">
        <div className="mb-1.5 text-[12px] text-slate-500">Recent activity</div>
        <div className="flex flex-wrap gap-1.5">
          {agent.recentTopics.map((topic) => (
            <span
              key={topic}
              className="inline-flex items-center rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[12px] text-slate-600"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// New Agent modal
// ---------------------------------------------------------------------------

function NewAgentModal({ open, onClose }) {
  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/40"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-agent-title"
        className="relative w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-md p-1 text-slate-500 hover:bg-slate-100"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 flex-none items-center justify-center rounded-md bg-accent text-accent-foreground">
            <Terminal size={18} />
          </div>
          <div>
            <h2
              id="new-agent-title"
              className="text-base font-semibold tracking-tight text-slate-900"
            >
              Build a new agent
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              To build a new agent, open Claude Code in this project and
              describe what you want the agent to do. Claude will scaffold the
              files, data shape, and UI for you.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md bg-accent px-3 py-2 text-sm font-medium text-accent-foreground hover:opacity-90"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

function buildSummary(agents) {
  const counts = agents.reduce(
    (acc, a) => {
      acc[a.status] = (acc[a.status] || 0) + 1;
      return acc;
    },
    { running: 0, paused: 0, error: 0 }
  );
  const parts = [`${agents.length} agents`];
  if (counts.running) parts.push(`${counts.running} running`);
  if (counts.paused) parts.push(`${counts.paused} paused`);
  if (counts.error) parts.push(`${counts.error} error`);
  return parts.join(' \u00b7 ');
}

function SectionHeader({ title, hint }) {
  return (
    <div className="mb-5 flex items-baseline justify-between border-b border-slate-200 pb-2">
      <h2 className="text-sm font-semibold tracking-tight text-slate-900">
        {title}
      </h2>
      {hint && <span className="text-xs text-slate-400">{hint}</span>}
    </div>
  );
}

export default function Agents() {
  const [modalOpen, setModalOpen] = useState(false);
  const allAgents = [...ASSISTANTS, ...CONSULTANTS];
  const summary = buildSummary(allAgents);

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Agent Hub
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Assistants handle scheduled tasks, consultants advise in real time.{' '}
            <span className="text-slate-400">&middot;</span>{' '}
            <span className="text-slate-500">{summary}</span>
          </p>
        </div>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 self-start rounded-md bg-accent px-3 py-2 text-sm font-medium text-accent-foreground hover:opacity-90"
        >
          <Plus size={16} />
          New Agent
        </button>
      </div>

      <section>
        <SectionHeader title="Assistants" hint={`${ASSISTANTS.length} scheduled`} />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {ASSISTANTS.map((agent) => (
            <AssistantCard key={agent.id} agent={agent} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader title="Consultants" hint={`${CONSULTANTS.length} interactive`} />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {CONSULTANTS.map((agent) => (
            <ConsultantCard key={agent.id} agent={agent} />
          ))}
        </div>
      </section>

      <NewAgentModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
