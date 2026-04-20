import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import Header from './Header.jsx';

// The top-level chrome for every authenticated page. Holds the sidebar
// open/closed state and renders the routed page into <Outlet />.
export default function Layout() {
  // Desktop: sidebar is persistent but can collapse to icon-only.
  const [collapsed, setCollapsed] = useState(false);
  // Mobile: sidebar is hidden by default and opens as an overlay drawer.
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-full w-full bg-slate-50">
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          onToggleCollapse={() => setCollapsed((v) => !v)}
          onOpenMobile={() => setMobileOpen(true)}
        />
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
