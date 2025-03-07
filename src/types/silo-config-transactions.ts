import { SiloConfigTransactionStatus } from "@/types/types"

export type SiloConfigTransactionStatuses = Partial<
  Record<
    | "SET_BASE_TOKEN"
    | "DEPLOY_NEAR"
    | "DEPLOY_USDC"
    | "DEPLOY_USDT"
    | "DEPLOY_AURORA"
    | "DEPLOY_ETH",
    SiloConfigTransactionStatus | null
  >
>
