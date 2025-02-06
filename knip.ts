import type { KnipConfig } from "knip"

const config: KnipConfig = {
  ignore: [
    "src/types/supabase.ts",
    "jest.*",
    "test-utils/**",
    "jest-puppeteer.config.js",
  ],
}

export default config
