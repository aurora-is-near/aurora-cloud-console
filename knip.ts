import type { KnipConfig } from "knip"

const config: KnipConfig = {
  ignore: [
    "src/types/supabase.ts",
    "jest.*",
    "test-utils/**",
    "jest-puppeteer.config.js",
    "src/cms/generated/graphql.ts",
    "src/providers/QueryProvider.tsx", // export used for testing
    "csp.js",
  ],
}

export default config
