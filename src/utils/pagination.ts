import { NextRequest } from "next/server"
import { abort } from "@/utils/abort"

const DEFAULT_LIMIT = 20
const MAX_LIMIT = 100
const DEFAULT_OFFSET = 0

const getLimit = (req: NextRequest) => {
  const { searchParams } = req.nextUrl
  const limit = Number(searchParams.get("limit") ?? DEFAULT_LIMIT)

  if (limit > MAX_LIMIT) {
    abort(400, "Limit must be less than or equal to 100")
  }

  return limit
}

export const getLimitAndOffset = (req: NextRequest) => {
  const { searchParams } = req.nextUrl
  const limit = getLimit(req)
  const offset = Number(searchParams.get("offset") ?? DEFAULT_OFFSET)

  return { limit, offset }
}
