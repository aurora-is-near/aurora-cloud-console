// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs"

Sentry.init({
  dsn: "https://a7d10026629df3a3f8858f1fec5159a4@o4504157766942720.ingest.us.sentry.io/4507460929716224",
  enabled: !!process.env.NEXT_PUBLIC_SENTRY_ENABLED,
  tracesSampleRate: 0.1,
})
