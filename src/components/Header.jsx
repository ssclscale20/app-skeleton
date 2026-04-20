import { Menu, PanelLeftClose, Search, Bell } from 'lucide-react';

export default function Header({ onToggleCollapse, onOpenMobile }) {
  return (
    <header className="sticky top-0 z-20 flex h-16 flex-none items-center gap-3 border-b border-slate-200 bg-white px-4 sm:px-6">
      {/* Mobile: hamburger opens the sidebar drawer */}
      <button
        type="button"
        onClick={onOpenMobile}
        className="rounded-md p-2 text-slate-600 hover:bg-slate-100 md:hidden"
        aria-label="Open navigation"
      >
        <Menu size={20} />
      </button>

      {/* Desktop: collapse/expand the sidebar */}
      <button
        type="button"
        onClick={onToggleCollapse}
        className="hidden rounded-md p-2 text-slate-600 hover:bg-slate-100 md:inline-flex"
        aria-label="Toggle sidebar"
      >
        <PanelLeftClose size={20} />
      </button>

      {/* Search (non-functional placeholder) */}
      <div className="relative hidden max-w-md flex-1 md:block">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="search"
          placeholder="Search…"
          className="w-full rounded-md border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-900 placeholder-slate-400 focus:border-accent focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/20"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          className="rounded-md p-2 text-slate-600 hover:bg-slate-100"
          aria-label="Notifications"
        >
          <Bell size={18} />
        </button>

        {/* ------------------------------------------------------------------
            TODO: Add Clerk <UserButton /> or <SignInButton /> here.
            Example:
              import { UserButton, SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
              <SignedIn><UserButton afterSignOutUrl="/" /></SignedIn>
              <SignedOut><SignInButton mode="modal" /></SignedOut>
           ------------------------------------------------------------------ */}
        <div
          className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-xs font-medium text-slate-600"
          title="Sign-in goes here once Clerk is wired up"
        >
          U
        </div>
      </div>
    </header>
  );
}
