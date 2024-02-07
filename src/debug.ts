import debug from "debug"

type DebuggerName = "proxy-api"

export const createDebugger = (name: DebuggerName) => debug(name)
