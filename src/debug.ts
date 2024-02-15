import debug from "debug"

type DebuggerName = "proxy-api" | "proxy-db"

export const createDebugger = (name: DebuggerName) => debug(name)
