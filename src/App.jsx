import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Members from './pages/Members.jsx';
import MemberDetail from './pages/MemberDetail.jsx';
import Pipeline from './pages/Pipeline.jsx';
import Content from './pages/Content.jsx';
import Analytics from './pages/Analytics.jsx';
import Agents from './pages/Agents.jsx';
import Settings from './pages/Settings.jsx';

// -----------------------------------------------------------------------------
// TODO: Wrap protected routes in Clerk's <SignedIn> / <SignedOut> components
// once auth is wired up in main.jsx. Example:
//
//   import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
//
//   <Route element={<SignedIn><Layout /></SignedIn>}>...</Route>
//   <Route path="*" element={<SignedOut><RedirectToSignIn /></SignedOut>} />
// -----------------------------------------------------------------------------

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="members" element={<Members />} />
        <Route path="members/:id" element={<MemberDetail />} />
        <Route path="pipeline" element={<Pipeline />} />
        <Route path="content" element={<Content />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="agents" element={<Agents />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
