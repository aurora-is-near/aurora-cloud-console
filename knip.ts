import type { KnipConfig } from "knip"

const config: KnipConfig = {
  ignore: ["src/types/supabase.ts", "jest.*", "test-utils/**"],
  ignoreDependencies: ["ethers"],
}

export default config
