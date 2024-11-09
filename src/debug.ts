import debug from "debug"

type DebuggerName =
  | "proxy-api"
  | "proxy-db"
  | "grafana"
  | "aurora-oracle"
  | "forwarder"
  | "coingecko"

export const createDebugger = (name: DebuggerName) => debug(name)
