import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

// -----------------------------------------------------------------------------
// TODO: Add Clerk auth provider here.
//
// 1. npm install @clerk/clerk-react
// 2. Add VITE_CLERK_PUBLISHABLE_KEY to your .env (see .env.example).
// 3. Replace the render block below with:
//
//    import { ClerkProvider } from '@clerk/clerk-react';
//    const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
//
//    ReactDOM.createRoot(document.getElementById('root')).render(
//      <React.StrictMode>
//        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
//          <BrowserRouter>
//            <App />
//          </BrowserRouter>
//        </ClerkProvider>
//      </React.StrictMode>
//    );
// -----------------------------------------------------------------------------

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
