import { NextRequest } from "next/server"

const DEFAULT_LIMIT = 30
const DEFAULT_OFFSET = 0

export const getPaginationFromQuery = (
  req: NextRequest,
): {
  limit: number
  offset: number
} => {
  const { searchParams } = req.nextUrl
  const limit = searchParams.get("limit")
  const offset = searchParams.get("offset")

  return {
    limit: limit ? Number(limit) : DEFAULT_LIMIT,
    offset: offset ? Number(offset) : DEFAULT_OFFSET,
  }
}
