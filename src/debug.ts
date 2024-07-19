import debug from "debug"

type DebuggerName = "proxy-api" | "proxy-db" | "grafana" | "aurora-oracle"

export const createDebugger = (name: DebuggerName) => debug(name)
