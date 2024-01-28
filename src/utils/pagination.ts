import { abort } from "@/utils/abort"
import { NextRequest } from "next/server"

const DEFAULT_LIMIT = 20
const MAX_LIMIT = 100
const DEFAULT_OFFSET = 0

export const getLimitAndOffset = (req: NextRequest) => {
  const { searchParams } = req.nextUrl
  const limit = Number(searchParams.get("limit") ?? DEFAULT_LIMIT)
  const offset = Number(searchParams.get("offset") ?? DEFAULT_OFFSET)

  if (Number.isNaN(limit)) {
    abort(400, "Limit must be a number")
  }

  if (limit > MAX_LIMIT) {
    abort(400, "Limit must be less than or equal to 100")
  }

  if (Number.isNaN(offset)) {
    abort(400, "Offset must be a number")
  }

  return { limit, offset }
}
