import { AuroraOracleContract } from "@/types/aurora-oracle-api"
import { Oracle } from "@/types/types"

export type AuroraOracle = Oracle & {
  contract?: AuroraOracleContract
}
