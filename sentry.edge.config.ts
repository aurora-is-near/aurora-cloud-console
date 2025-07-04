// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs"

Sentry.init({
  dsn: "https://a7d10026629df3a3f8858f1fec5159a4@o4504157766942720.ingest.us.sentry.io/4507460929716224",
  enabled: !!process.env.NEXT_PUBLIC_SENTRY_ENABLED,
  tracesSampleRate: 0.1,
})
