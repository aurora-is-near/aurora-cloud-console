import debug from "debug"

type DebuggerName = "proxy-api" | "proxy-db" | "grafana"

export const createDebugger = (name: DebuggerName) => debug(name)
