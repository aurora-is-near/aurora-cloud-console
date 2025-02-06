import type { KnipConfig } from "knip"

const config: KnipConfig = {
  ignore: [
    "src/types/supabase.ts",
    "jest.*",
    "test-utils/**",
    "jest-puppeteer.config.js",
    // --- not used uikit components in current design state
    "src/uikit/CardProgress/CardProgress.tsx",
    // ---
  ],
}

export default config
