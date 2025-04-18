import type { KnipConfig } from "knip"

const config: KnipConfig = {
  ignore: [
    "src/types/supabase.ts",
    "jest.*",
    "test-utils/**",
    "jest-puppeteer.config.js",
    "src/actions/silos/request-intents-integration.ts",
    "src/providers/QueryProvider.tsx", // export used for testing
  ],
}

export default config
