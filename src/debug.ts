import debug from "debug"

type DebuggerName =
  | "proxy-api"
  | "proxy-db"
  | "grafana"
  | "aurora-oracle"
  | "forwarder"
  | "coingecko"
  | "blockscout-db"

export const createDebugger = (name: DebuggerName) => debug(name)
