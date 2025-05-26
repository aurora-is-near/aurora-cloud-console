import debug from "debug"

type DebuggerName =
  | "proxy-db"
  | "grafana"
  | "aurora-oracle"
  | "forwarder"
  | "coingecko"
  | "blockscout-db"
  | "contract-changer"
  | "silos-near-fee-collector-db"

export const createDebugger = (name: DebuggerName) => debug(name)
