import { Router } from 'express';

const router = Router();

// GET /api/analytics — return high-level KPIs for the dashboard.
router.get('/', (_req, res) => {
  // TODO: Replace placeholder response with aggregated Supabase queries
  // or a call to your analytics provider (PostHog, Plausible, etc.).
  res.json({
    data: {
      totalClients: null,
      activeProjects: null,
      revenueMTD: null,
      engagement: null,
    },
  });
});

export default router;
