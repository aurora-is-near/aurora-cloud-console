import {
  SiloConfigTransactionOperation,
  SiloConfigTransactionStatus,
} from "@/types/types"

export type SiloConfigTransactionStatuses = Partial<
  Record<SiloConfigTransactionOperation, SiloConfigTransactionStatus | null>
>
