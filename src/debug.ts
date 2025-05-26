import debug from "debug"

type DebuggerName =
  | "grafana"
  | "aurora-oracle"
  | "forwarder"
  | "coingecko"
  | "blockscout-db"
  | "contract-changer"

export const createDebugger = (name: DebuggerName) => debug(name)
