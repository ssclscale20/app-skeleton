import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Filter,
  FileText,
  BarChart3,
  Bot,
  Settings as SettingsIcon,
  X,
} from 'lucide-react';

// The nav items. Add a new entry here (plus a matching <Route> in App.jsx
// and a page component in src/pages) to extend the dashboard.
const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/members', label: 'Members', icon: Users },
  { to: '/pipeline', label: 'Pipeline', icon: Filter },
  { to: '/content', label: 'Content', icon: FileText },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/agents', label: 'Agents', icon: Bot },
  { to: '/settings', label: 'Settings', icon: SettingsIcon },
];

export default function Sidebar({ collapsed, mobileOpen, onCloseMobile }) {
  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/40 md:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={[
          'fixed inset-y-0 left-0 z-40 flex flex-col border-r border-slate-200 bg-white transition-all duration-200',
          // Mobile: slide in/out
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
          // Desktop: always visible, width toggles between full and icon-only
          'md:static md:translate-x-0',
          collapsed ? 'md:w-16' : 'md:w-64',
          'w-64',
        ].join(' ')}
        aria-label="Primary"
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4">
          <div className="flex items-center gap-2 overflow-hidden">
            {/* TODO: Replace with your logo (SVG or <img>). */}
            <div className="flex h-8 w-8 flex-none items-center justify-center rounded-md bg-accent text-accent-foreground font-semibold">
              B
            </div>
            {!collapsed && (
              <span className="truncate text-sm font-semibold tracking-tight text-slate-900">
                {/* TODO: Replace with your brand name. */}
                Brand
              </span>
            )}
          </div>
          {/* Mobile close button */}
          <button
            type="button"
            onClick={onCloseMobile}
            className="rounded-md p-1 text-slate-500 hover:bg-slate-100 md:hidden"
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          <ul className="space-y-1">
            {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    [
                      'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-accent text-accent-foreground'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                      collapsed ? 'md:justify-center md:px-2' : '',
                    ].join(' ')
                  }
                >
                  <Icon size={18} className="flex-none" />
                  <span className={collapsed ? 'md:hidden' : ''}>{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-slate-200 p-3 text-xs text-slate-400">
          {!collapsed && <span>v0.1</span>}
        </div>
      </aside>
    </>
  );
}
