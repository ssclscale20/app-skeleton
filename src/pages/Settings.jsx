import ContentCard from '../components/ContentCard.jsx';

function Field({ label, placeholder, hint, type = 'text' }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-accent focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/20"
      />
      {hint && <p className="text-xs text-slate-500">{hint}</p>}
    </div>
  );
}

export default function Settings() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Settings
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          [Configure your brand, integrations, and workspace.]
        </p>
      </div>

      <ContentCard title="Branding">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            label="Brand name"
            placeholder="Your company name"
            hint="Shown in the sidebar and browser title."
          />
          <Field
            label="Logo URL"
            placeholder="https://…/logo.svg"
            hint="Replace the placeholder mark in Sidebar.jsx."
          />
          <Field
            label="Accent color (hex)"
            placeholder="#0f172a"
            hint="Edit --accent in src/index.css for a permanent change."
          />
          <Field
            label="Support email"
            placeholder="hello@example.com"
            type="email"
          />
        </div>
      </ContentCard>

      <ContentCard title="Integrations">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            label="Clerk publishable key"
            placeholder="pk_test_…"
            hint="Set VITE_CLERK_PUBLISHABLE_KEY in your .env file."
          />
          <Field
            label="Supabase URL"
            placeholder="https://xyz.supabase.co"
            hint="Set VITE_SUPABASE_URL in your .env file."
          />
          <Field
            label="Supabase anon key"
            placeholder="eyJhbGciOi…"
            hint="Set VITE_SUPABASE_ANON_KEY in your .env file."
          />
          <Field
            label="API port"
            placeholder="3001"
            hint="Set PORT in your .env file."
          />
        </div>
        <p className="mt-4 text-xs text-slate-500">
          These inputs are illustrative — real values belong in{' '}
          <code className="rounded bg-slate-100 px-1 py-0.5 text-[11px]">.env</code>.
          See <code className="rounded bg-slate-100 px-1 py-0.5 text-[11px]">CLAUDE.md</code> for setup help.
        </p>
      </ContentCard>
    </div>
  );
}
