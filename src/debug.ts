import debug from "debug"

type DebuggerName =
  | "grafana"
  | "aurora-oracle"
  | "forwarder"
  | "coingecko"
  | "blockscout-db"
  | "contract-changer"
  | "near-fee-collector-db"

export const createDebugger = (name: DebuggerName) => debug(name)
