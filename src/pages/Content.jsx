import ContentCard from '../components/ContentCard.jsx';
import { Plus, FileText } from 'lucide-react';

export default function Content() {
  // TODO: Fetch real content items from /api/content once Supabase is wired up.
  const tiles = [1, 2, 3, 4, 5, 6];

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Content
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            [Posts, articles, media — whatever you publish.]
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md bg-accent px-3 py-2 text-sm font-medium text-accent-foreground hover:opacity-90"
        >
          <Plus size={16} />
          New item
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((i) => (
          <ContentCard key={i} className="transition hover:shadow-md">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-md bg-slate-100 text-slate-400">
                <FileText size={18} />
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-slate-900">
                  [Your content item]
                </div>
                <div className="text-xs text-slate-500">[Updated recently]</div>
              </div>
            </div>
          </ContentCard>
        ))}
      </div>
    </div>
  );
}
