import type { KnipConfig } from "knip"

const config: KnipConfig = {
  ignore: ["src/types/supabase.ts", "jest.*"],
  ignoreDependencies: ["ethers"],
}

export default config
